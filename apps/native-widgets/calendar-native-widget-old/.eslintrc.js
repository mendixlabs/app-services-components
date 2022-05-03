const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base");

// Insert custom eslint rules in here

module.exports = {
    ...base,
    rules: {
        "@typescript-eslint/ban-ts-ignore": "warn",
        "react/display-name": "off"
    }
};
