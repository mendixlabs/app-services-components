import { LottieNativePreviewProps } from "../typings/LottieNativeProps";
import { hidePropertiesIn } from "@appservicescomponents/chore";

type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export function getProperties(values: LottieNativePreviewProps, defaultProperties: Properties): Properties {
    if (values.playMode === "sequential") {
        hidePropertiesIn(defaultProperties, values, ["frameToStart", "loopAnimation", "frameToEnd", "pausePlay"]);
    }
    if (values.playMode === "controlled") {
        hidePropertiesIn(defaultProperties, values, ["sequence"]);
    }
    return defaultProperties;
}

export function check(_values: LottieNativePreviewProps): Problem[] {
    const errors: Problem[] = [];

    return errors;
}
