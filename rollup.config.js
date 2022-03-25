export default args => {
    const result = args.configDefaultConfig;
    const newResult = result.reduce((a, c) => {
        const temp = {
            ...c,
            inlineDynamicImports: true
        };
        return [...a, temp];
    }, []);
    return newResult;
};
