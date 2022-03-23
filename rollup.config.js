import { join } from "path";

export default args => {
    const result = args.configDefaultConfig;
    const [jsConfig, mJsConfig] = result;

    // We change the output because maps widget package was wrongly named with uppercase M in the past.
    jsConfig.inlineDynamicImports = true;
    mJsConfig.inlineDynamicImports = true;

    return result;
};
