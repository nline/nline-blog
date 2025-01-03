import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("@fisch0920/eslint-config"), {
    rules: {
        "react/prop-types": "off",
        "unicorn/no-array-reduce": "off",
        "unicorn/filename-case": "off",
        "no-process-env": "off",
        "array-callback-return": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/media-has-caption": "off",
        "jsx-a11y/interactive-supports-focus": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "@typescript-eslint/naming-convention": "off",
    },
}];