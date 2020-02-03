const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

module.exports = {
    ...base,
    rules: {
        "@typescript-eslint/ban-ts-ignore": "warn",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-function": "off",
        "react/no-find-dom-node": "off",
        "react/no-deprecated": "warn"
    }
};
