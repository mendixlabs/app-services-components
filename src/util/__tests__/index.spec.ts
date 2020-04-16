import { createCamelcaseId, getReferencePart } from "..";

describe("Utils", () => {
    it("should create the right IDs", () => {
        const camel1 = createCamelcaseId("TestingAll");
        const camel2 = createCamelcaseId("id");
        const camel3 = createCamelcaseId("key");
        const camel4 = createCamelcaseId("children");

        expect(camel1).toEqual("testingall");
        expect(camel2).toEqual("idId");
        expect(camel3).toEqual("keyId");
        expect(camel4).toEqual("childrenId");
    });

    it("should create the right references", () => {
        const ref = getReferencePart("11111/22222");
        const entity = getReferencePart("11111/22222", "entity");
        const empty = getReferencePart("");
        const emptyEntity = getReferencePart("", "entity");

        expect(ref).toEqual("11111");
        expect(entity).toEqual("22222");
        expect(empty).toEqual("");
        expect(emptyEntity).toEqual("");
    });
});
