const lower = (x: string) => x.toLowerCase();
const upper = (x: string) => x.toUpperCase();
const camel = (x: string, delim = "-") =>
    lower(x).replace(new RegExp(`\\${delim}+(\\w)`, "g"), (_, c: string) => upper(c));

export const createCamelcaseId = (str: string): string => {
    const camelCased = camel(str);
    const reserved = ["id", "key", "children"];
    if (reserved.indexOf(camelCased) !== -1) {
        return `${camelCased}Id`;
    }
    return camelCased;
};

type ReferencePart = "referenceAttr" | "entity";

export const getReferencePart = (reference = "", part: ReferencePart = "referenceAttr"): string => {
    const partNum = part === "referenceAttr" ? 0 : 1;
    const parts = reference.split("/");
    if (reference === "" || parts.length < partNum + 1) {
        return "";
    }
    return parts[partNum];
};
