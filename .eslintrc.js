const base = require("./node_modules/@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

base["rules"]["no-unused-expressions"] = "warn";

module.exports = {
    ...base,
};
