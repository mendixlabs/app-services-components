const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

module.exports = {
    ...base,
    rules: {
        "@typescript-eslint/ban-ts-ignore": "warn",
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/explicit-member-accessibility": "off",
    }
};
