import { hidePropertiesIn } from "./utils/rndChores";

export function getProperties(values: any, defaultProperties: any, _platform: "web" | "desktop") {
    if (!values.isParent) {
        hidePropertiesIn(defaultProperties, values, ["uuidStringParentExpression"]);
    }
    if (values.isParent) {
        hidePropertiesIn(defaultProperties, values, ["uuidStringParent"]);
    }

    return defaultProperties;
}
