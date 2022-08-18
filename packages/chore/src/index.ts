// Verbatim Copy of this "uNpUbLiShAbLe package" https://github.com/mendix/widgets-resources/tree/master/packages/tools/piw-utils-internal

export type Properties = PropertyGroup[];

export type PropertyGroup = {
  caption: string;
  propertyGroups?: PropertyGroup[];
  properties?: Property[];
};

export type Property = {
  key: string;
  caption: string;
  description?: string;
  objectHeaders?: string[]; // used for customizing object grids
  objects?: ObjectProperties[];
  properties?: Properties[]; // Property needs to remain here for compatibility with Studio Pro < 8.12
};

export type Problem = {
  property?: string; // key of the property, at which the problem exists
  severity?: "error" | "warning" | "deprecation"; // default = "error"
  message: string; // description of the problem
  studioMessage?: string; // studio-specific message, defaults to message
  url?: string; // link with more information about the problem
  studioUrl?: string; // studio-specific link
};

export type ObjectProperties = {
  properties: PropertyGroup[];
  captions?: string[]; // used for customizing object grids
};

/**
 * Structure preview typings
 */

type BaseProps = {
  type: string;
  grow?: number;
};

export type StructurePreviewProps =
  | ImageProps
  | ContainerProps
  | RowLayoutProps
  | TextProps
  | DropZoneProps
  | SelectableProps;

export type ImageProps = BaseProps & {
  type: "Image";
  document?: string; // svg image
  data?: string; // base64 image. Will only be read if no svg image is passed
  width?: number; // sets a fixed maximum width
  height?: number; // sets a fixed maximum height
};

export type ContainerProps = BaseProps & {
  type: "Container";
  children?: StructurePreviewProps[];
  borders?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  backgroundColor?: string;
  padding?: number;
};

export type RowLayoutProps = BaseProps & {
  type: "RowLayout";
  children: StructurePreviewProps[];
  borders?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  columnSize?: "fixed" | "grow";
  backgroundColor?: string;
  padding?: number;
};

export type TextProps = BaseProps & {
  type: "Text";
  content: string;
  fontSize?: number;
  fontColor?: string;
  bold?: boolean;
  italic?: boolean;
};

export type DropZoneProps = BaseProps & {
  type: "DropZone";
  property: object;
  placeholder?: string;
};

export type SelectableProps = BaseProps & {
  object: object;
  child: StructurePreviewProps;
};

declare type Option<T> = T | undefined;

export function hidePropertyIn<T, TKey extends keyof T>(
  propertyGroups: PropertyGroup[],
  _value: T,
  key: TKey
): void;
export function hidePropertyIn<T, TKey extends keyof T>(
  propertyGroups: PropertyGroup[],
  _value: T,
  key: TKey,
  nestedPropIndex: number,
  nestedPropKey: T[TKey] extends Array<infer TChild> ? keyof TChild : never
): void;
export function hidePropertyIn<T, TKey extends keyof T>(
  propertyGroups: PropertyGroup[],
  _value: T,
  key: TKey,
  nestedPropIndex?: number,
  nestedPropKey?: T[TKey] extends Array<infer TChild> ? keyof TChild : never
): void {
  modifyProperty(
    (_, index, container) => container.splice(index, 1),
    propertyGroups,
    key,
    nestedPropIndex,
    nestedPropKey
  );
}

export function hidePropertiesIn<T>(
  propertyGroups: PropertyGroup[],
  _value: T,
  keys: Array<keyof T>
): void {
  keys.forEach((key) =>
    modifyProperty(
      (_, index, container) => container.splice(index, 1),
      propertyGroups,
      key,
      undefined,
      undefined
    )
  );
}

export function hideNestedPropertiesIn<T, TKey extends keyof T>(
  propertyGroups: Properties,
  _value: T,
  key: TKey,
  nestedPropIndex: number,
  nestedPropKeys: Array<
    T[TKey] extends Array<infer TChild> ? keyof TChild : never
  >
): void {
  nestedPropKeys.forEach((nestedKey) =>
    hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedKey)
  );
}

export function changePropertyIn<T, TKey extends keyof T>(
  propertyGroups: PropertyGroup[],
  _value: T,
  modify: (prop: Property) => void,
  key: TKey
): void;
export function changePropertyIn<T, TKey extends keyof T>(
  propertyGroups: PropertyGroup[],
  _value: T,
  modify: (prop: Property) => void,
  key: TKey,
  nestedPropIndex: number,
  nestedPropKey: string
): void;
export function changePropertyIn<T, TKey extends keyof T>(
  propertyGroups: PropertyGroup[],
  _value: T,
  modify: (prop: Property) => void,
  key: TKey,
  nestedPropIndex?: number,
  nestedPropKey?: string
): void {
  modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey);
}

export function transformGroupsIntoTabs(properties: Properties) {
  const groups: PropertyGroup[] = [];
  properties.forEach((property) => {
    if (property.propertyGroups) {
      groups.push(...property.propertyGroups);
      property.propertyGroups = [];
    }
  });
  properties.push(...groups);
}

function modifyProperty(
  modify: (prop: Property, index: number, container: Property[]) => void,
  propertyGroups: PropertyGroup[],
  key: string | number | symbol,
  nestedPropIndex?: number,
  nestedPropKey?: string | number | symbol
) {
  propertyGroups.forEach((propGroup) => {
    if (propGroup.propertyGroups) {
      modifyProperty(
        modify,
        propGroup.propertyGroups,
        key,
        nestedPropIndex,
        nestedPropKey
      );
    }

    propGroup.properties?.forEach((prop, index, array) => {
      if (prop.key === key) {
        if (nestedPropIndex === undefined || nestedPropKey === undefined) {
          modify(prop, index, array);
        } else if (prop.objects) {
          modifyProperty(
            modify,
            prop.objects[nestedPropIndex].properties,
            nestedPropKey
          );
        } else if (prop.properties) {
          modifyProperty(
            modify,
            prop.properties[nestedPropIndex],
            nestedPropKey
          );
        }
      }
    });
  });
}

export function moveProperty(
  fromIndex: number,
  toIndex: number,
  properties: Properties
): void {
  if (
    fromIndex >= 0 &&
    toIndex >= 0 &&
    fromIndex < properties.length &&
    toIndex < properties.length &&
    fromIndex !== toIndex
  ) {
    properties.splice(toIndex, 0, ...properties.splice(fromIndex, 1));
  }
}
