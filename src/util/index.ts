// @ts-ignore
import { camel } from "@thi.ng/strings";

export const createCamelcaseId = (str: string): string => {
    const camelCased = camel(str);
    if ("id" === camelCased) {
        return "idId";
    }
    return camelCased;
};

export const fetchAttr = (obj: mendix.lib.MxObject, attr: string): Promise<any> =>
    new Promise((resolve, reject) => {
        try {
            obj.fetch(attr, val => resolve(val));
        } catch (e) {
            reject(e);
        }
    });
