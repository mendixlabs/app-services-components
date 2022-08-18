declare type Properties = PropertyGroup[];
declare type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};
declare type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[];
    objects?: ObjectProperties[];
    properties?: Properties[];
};
declare type Problem = {
    property?: string;
    severity?: "error" | "warning" | "deprecation";
    message: string;
    studioMessage?: string;
    url?: string;
    studioUrl?: string;
};
declare type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[];
};
/**
 * Structure preview typings
 */
declare type BaseProps = {
    type: string;
    grow?: number;
};
declare type StructurePreviewProps = ImageProps | ContainerProps | RowLayoutProps | TextProps | DropZoneProps | SelectableProps;
declare type ImageProps = BaseProps & {
    type: "Image";
    document?: string;
    data?: string;
    width?: number;
    height?: number;
};
declare type ContainerProps = BaseProps & {
    type: "Container";
    children?: StructurePreviewProps[];
    borders?: boolean;
    borderRadius?: number;
    borderWidth?: number;
    backgroundColor?: string;
    padding?: number;
};
declare type RowLayoutProps = BaseProps & {
    type: "RowLayout";
    children: StructurePreviewProps[];
    borders?: boolean;
    borderRadius?: number;
    borderWidth?: number;
    columnSize?: "fixed" | "grow";
    backgroundColor?: string;
    padding?: number;
};
declare type TextProps = BaseProps & {
    type: "Text";
    content: string;
    fontSize?: number;
    fontColor?: string;
    bold?: boolean;
    italic?: boolean;
};
declare type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object;
    placeholder?: string;
};
declare type SelectableProps = BaseProps & {
    object: object;
    child: StructurePreviewProps;
};
declare function hidePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, key: TKey): void;
declare function hidePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, key: TKey, nestedPropIndex: number, nestedPropKey: T[TKey] extends Array<infer TChild> ? keyof TChild : never): void;
declare function hidePropertiesIn<T>(propertyGroups: PropertyGroup[], _value: T, keys: Array<keyof T>): void;
declare function hideNestedPropertiesIn<T, TKey extends keyof T>(propertyGroups: Properties, _value: T, key: TKey, nestedPropIndex: number, nestedPropKeys: Array<T[TKey] extends Array<infer TChild> ? keyof TChild : never>): void;
declare function changePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, modify: (prop: Property) => void, key: TKey): void;
declare function changePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, modify: (prop: Property) => void, key: TKey, nestedPropIndex: number, nestedPropKey: string): void;
declare function transformGroupsIntoTabs(properties: Properties): void;
declare function moveProperty(fromIndex: number, toIndex: number, properties: Properties): void;

export { ContainerProps, DropZoneProps, ImageProps, ObjectProperties, Problem, Properties, Property, PropertyGroup, RowLayoutProps, SelectableProps, StructurePreviewProps, TextProps, changePropertyIn, hideNestedPropertiesIn, hidePropertiesIn, hidePropertyIn, moveProperty, transformGroupsIntoTabs };
