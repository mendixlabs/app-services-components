const cwd = process.cwd();
const configs = require("@mendix/pluggable-widgets-tools/test-config/jest.config");

module.exports = {
    ...configs,
    rootDir: "./",
    testMatch: [`${cwd}/src/**/?(*.)(spec|test).[jt]s?(x)`],
    testPathIgnorePatterns: [
        `${cwd}/dist`,
        "<rootDir>/node_modules"
    ],
    globals: {
        "ts-jest": {
            tsConfig: `${cwd}/tsconfig.spec.json`
        }
    },
    moduleDirectories: ["<rootDir>/node_modules", `${cwd}/node_modules`, `${cwd}/src`],
    moduleNameMapper: {
        "antd/es/table": "<rootDir>/node_modules/antd/lib/table",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    collectCoverage: true,
    coverageDirectory: `${cwd}/dist/coverage`,
};
