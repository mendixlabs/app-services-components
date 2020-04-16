import { createElement } from "react";
import { shallow } from "enzyme";

import { Alerts } from "../Alert";
import { ValidationMessage } from "@jeltemx/mendix-react-widget-utils/lib/validation";

const createValidationMessage = (text: string, id: string, fatal = true): ValidationMessage => {
    return {
        dismissable: false,
        fatal,
        id,
        message: text
    };
};

describe("Alert", () => {
    it("renders the structure when an alert message is specified", () => {
        const text = "this is a text";
        const message = createValidationMessage(text, "1");
        const alert = shallow(<Alerts validationMessages={[message]} />);

        expect(alert.find(".alert-danger")).toHaveLength(1);
    });

    it("renders a list", () => {
        const texts = ["1", "2"];
        const messages = texts.map(t => createValidationMessage(t, "1", false));
        const alert = shallow(<Alerts validationMessages={messages} />);

        expect(alert.find(".alert-warning")).toHaveLength(2);
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(<Alerts validationMessages={[]} />);
        expect(alert.isEmptyRender()).toBe(true);
    });
});
