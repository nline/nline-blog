import * as React from 'react'

import { ImageResponse } from 'next/og'

import { api, apiHost, rootNotionPageId } from '@/lib/config'
import { NotionPageInfo } from '@/lib/types'

const interRegularFontP = fetch(
  new URL('../../public/fonts/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const interBoldFontP = fetch(
  new URL('../../public/fonts/Inter-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export const runtime = 'edge'

export default async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pageId = searchParams.get('id') || rootNotionPageId
  if (!pageId) {
    return new Response('Invalid notion page id', { status: 400 })
  }

  const pageInfoRes = await fetch(`${apiHost}${api.getNotionPageInfo}`, {
    method: 'POST',
    body: JSON.stringify({ pageId }),
    headers: {
      'content-type': 'application/json'
    }
  })
  if (!pageInfoRes.ok) {
    return new Response(pageInfoRes.statusText, { status: pageInfoRes.status })
  }
  const pageInfo: NotionPageInfo = await pageInfoRes.json()
  // console.log(pageInfo)

  const showText = searchParams.get('text') !== 'false'
  const [interRegularFont, interBoldFont] = await Promise.all([
    interRegularFontP,
    interBoldFontP
  ])

  // NOTE: The image is pulled from the header cover of the Notion page!
  try {
    const imgResponse = new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1F2027',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Inter", sans-serif',
            color: 'black'
          }}
        >
          {pageInfo.image && (
            <img
              src={pageInfo.image}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: showText ? 'blur(2px)' : 'none'
              }}
            />
          )}

          {showText && (
            <>
              <div
                style={{
                  position: 'relative',
                  width: 900,
                  height: 465,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '16px solid rgba(0,0,0,0.3)',
                  borderRadius: 12,
                  zIndex: 1
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: '#fff',
                    padding: 36
                  }}
                >
                  <div
                    style={{
                      fontSize: 60,
                      fontWeight: 700,
                      fontFamily: 'Inter',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {pageInfo.title}
                  </div>

                  <hr
                    style={{
                      borderTop: '2px solid rgba(0, 0, 0, 0.3)',
                      margin: '10px 0'
                    }}
                  />

                  {pageInfo.detail && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: 32,
                        opacity: 0.6,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%'
                      }}
                    >
                      <div>{pageInfo.detail}</div>
                      {pageInfo.author && (
                        <div style={{ alignItems: 'flex-start' }}>
                          {pageInfo.author}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {pageInfo.authorImage && (
                <div
                  style={{
                    position: 'absolute',
                    top: 47,
                    left: 104,
                    height: 128,
                    width: 128,
                    display: 'flex',
                    borderRadius: '50%',
                    border: '4px solid #fff',
                    zIndex: '5'
                  }}
                >
                  <img
                    src={pageInfo.authorImage}
                    style={{
                      width: '100%',
                      height: '100%'
                      // transform: 'scale(1.04)'
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegularFont,
            style: 'normal',
            weight: 400
          },
          {
            name: 'Inter',
            data: interBoldFont,
            style: 'normal',
            weight: 700
          }
        ]
      }
    )
    return imgResponse
  } catch (error) {
    console.error('Failed to create ImageResponse:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
