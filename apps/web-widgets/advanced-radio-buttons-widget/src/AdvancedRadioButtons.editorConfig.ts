import { AdvancedRadioButtonsPreviewProps } from "../typings/AdvancedRadioButtonsProps";
import { hidePropertyIn } from "@mendix/pluggable-widgets-tools";

export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

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

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: object; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object; // widgets property object from Values API
    placeholder: string; // text to be shown inside the dropzone when empty
    showDataSourceHeader?: boolean; // true by default. Toggles whether to show a header containing information about the datasource
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

// export function getProperties(values: ValuesAPI, defaultConfiguration: Properties): Properties {
//     return defaultConfiguration;
// }

export function getProperties(
    _values: AdvancedRadioButtonsPreviewProps,
    defaultProperties: Properties /* , target: Platform */
): Properties {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    if (!_values.showLabel) {
        hidePropertyIn(defaultProperties, _values, "labelCaption");
    }
    if (!_values.useCustomLabels) {
        hidePropertyIn(defaultProperties, _values, "customLabels");
        hidePropertyIn(defaultProperties, _values, "removeOtherOptions");
    }
    return defaultProperties;
}

export function check(_values: AdvancedRadioButtonsPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (_values.useCustomLabels && _values.customLabels.length === 0) {
        errors.push({
            property: `customLabels`,
            message: `At least one custom option label needs to be specified.`,
            url: "https://github.com/3loader/mx-advanced-radio-buttons"
        });
    }
    return errors;
}

export function getPreview(
    _values: AdvancedRadioButtonsPreviewProps,
    isDarkMode: boolean /* , version: number[] */
): PreviewProps {
    // Customize your pluggable widget appearance for Studio Pro.
    // function textBlock(textValue: string): TextProps {
    //     return {
    //         type: "Text",
    //         content: textValue
    //     }
    // }
    const circleFill = isDarkMode ? "transparent" : "rgb(234,241,247)";
    const circleStroke = isDarkMode ? "rgb(86, 86, 86)" : "rgb(210,210,210)";
    const disabledCircleColor = isDarkMode ? "rgb(86, 86, 86)" : "rgb(210,210,210)";
    const circleSvgImage = `
<svg height="64" width="64">
    <circle cx="32" cy="32" r="28" stroke="${circleStroke}" stroke-width="1" fill="${circleFill}" />
</svg>`;
    const disabledCircleSvgImage = `
<svg height="64" width="64">
    <circle cx="32" cy="32" r="28" stroke="${disabledCircleColor}" stroke-width="1" fill="${disabledCircleColor}" />
</svg>`;
    function valueCircle(): ContainerProps {
        return {
            type: "Container",
            children: [
                {
                    type: "Image",
                    document: _values.readOnly ? disabledCircleSvgImage : circleSvgImage,
                    width: 16
                }
            ]
        };
    }
    function valueText(val: string): ContainerProps {
        return {
            type: "Container",
            children: [
                {
                    type: "Text",
                    content: val
                }
            ]
        };
    }
    const parentContainer: PreviewProps = {
        type: "Container",
        children: []
    };
    const attributeNameBlock: ContainerProps = {
        type: "Container",
        children: [
            {
                type: "Text",
                fontSize: 8.5,
                fontColor: "#4473C4",
                content: `[${_values.attributeValue ? _values.attributeValue : "No attribute selected"}]`
            }
        ]
    };
    if (_values.showLabel && _values.labelCaption && _values.labelCaption.length > 0) {
        const labelProp: ContainerProps = {
            type: "Container",
            children: [
                {
                    type: "Text",
                    content: _values.labelCaption
                }
            ]
        };
        parentContainer.children.push(labelProp);
    }
    if (_values.orientation === "horizontal") {
        parentContainer.children.push({
            type: "RowLayout",
            columnSize: "grow",
            children: [
                valueCircle(),
                valueText("[Option 1]"),
                valueCircle(),
                valueText("[Option 2] ..."),
                attributeNameBlock,
                { type: "Container", grow: 2, children: [] }
            ]
        });
    }
    if (_values.orientation === "vertical") {
        parentContainer.children.push({
            type: "Container",
            children: [
                {
                    type: "Container",
                    children: [
                        {
                            type: "RowLayout",
                            columnSize: "grow",
                            children: [
                                valueCircle(),
                                valueText("[Option 1]"),
                                attributeNameBlock,
                                { type: "Container", grow: 2, children: [] }
                            ]
                        }
                    ]
                },
                {
                    type: "Container",
                    children: [
                        {
                            type: "RowLayout",
                            columnSize: "grow",
                            children: [
                                valueCircle(),
                                valueText("[Option 2] ..."),
                                { type: "Container", grow: 2, children: [] }
                            ]
                        }
                    ]
                }
            ]
        });
    }
    return parentContainer;
}

export function getCustomCaption(_values: AdvancedRadioButtonsPreviewProps /* , platform: Platform */): string {
    return "Advanced Radio Buttons";
}
