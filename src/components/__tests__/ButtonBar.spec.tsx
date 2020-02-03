import { createElement } from "react";
import { shallow } from "enzyme";

import { ButtonBar, ButtonBarProps } from "../ButtonBar";

describe("ButtonBar", () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const createButtonBar = (props: ButtonBarProps) => shallow(<ButtonBar {...props} />);

    it("should render the structure", () => {
        const props: ButtonBarProps = {
            className: "test",
            buttons: [
                {
                    caption: "disabled",
                    onClick: () => {
                        console.log('click')
                    },
                    disabled: true
                },
                {
                    caption: "enabled",
                    onClick: () => {
                        console.log('click')
                    },
                    disabled: false
                }
            ]
        };
        const bar = createButtonBar(props);

        expect(bar.hasClass("buttonbar")).toBe(true);
        expect(bar.hasClass("test")).toBe(true);
    });

    it("should render no structure when buttons are not there", () => {
        const props: ButtonBarProps = {
            buttons: []
        };
        const bar = createButtonBar(props);

        expect(bar).toEqual({});
    });
});
