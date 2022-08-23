const t = {
    name: "patch-react-floater",
    transform(code, id) {
        if (id.endsWith("react-floater/es/index.js")) {
            return `var global = typeof self !== undefined ? self : this;\n${code}`;
        }
    }
};
const q = {
    name: "@gilbarbara/deep-equal",
    transform(code, id) {
        if (id.endsWith("@gilbarbara/deep-equal/esm/index.js")) {
            return `var global = typeof self !== undefined ? self : this;\n${code}`;
        }
    }
};
export default args => {
    const result = args.configDefaultConfig;
    const newResult = result.reduce((a, c) => {
        const temp = {
            ...c,
            plugins: [...c.plugins, t, q]
        };
        return [...a, temp];
    }, []);
    return newResult;
};
