import { createElement } from "react";
import { shallow } from "enzyme";
import { Platform } from "react-native";
// import { render } from "@testing-library/react-native";
import { EditableValue, DynamicValue, ValueStatus } from "mendix";
import { Big } from "big.js";
import lottieLoading from "./loader.json";

import { LottieNative } from "../../LottieNative";
import { LottieNativeProps } from "typings/LottieNativeProps";
import { CustomStyle } from "src/utils/Types";
// import LottieViewContainer from "../LottieViewContainer";

const listViewType = (x: any): EditableValue<boolean> => ({
    status: ValueStatus.Available,
    readOnly: false,
    value: x,
    displayValue: "yes",
    setValue: jest.fn(),
    setTextValue: jest.fn(),
    validation: "Option_2<string>;",
    setValidator: jest.fn(),
    formatter: {
        format: jest.fn(),
        parse: jest.fn()
    },
    setFormatter: jest.fn(),
    universe: []
});
const dynamicBig = (x: any): DynamicValue<Big> => ({
    status: ValueStatus.Available,
    value: x
});
const dynamicBool = (x: any): DynamicValue<boolean> => ({
    status: ValueStatus.Available,
    value: x
});

const json = JSON.stringify(lottieLoading);
// const lottieViewProps: LottieViewContainerTypes = {
//     width: "full",
//     height: "full",
//     isBackground: true
// };
const lottieProps: LottieNativeProps<CustomStyle> = {
    name: "Mendix",
    animationJson: json,
    width: "full",
    height: "full",
    isBackground: true,
    frameToStart: dynamicBig(10),
    frameToEnd: dynamicBig(10),
    loopAnimation: dynamicBool(true),
    pausePlay: listViewType(true),
    playMode: "sequential",
    sequence: [
        {
            startFrame: 0,
            endFrame: 10,
            loop: true,
            onDoneAction: undefined
        }
    ],

    style: []
};
describe.each(["ios", "android"])("Lottie Widget for %s", (os: "ios" | "android") => {
    beforeEach(() => {
        Platform.OS = os;
        Platform.select = jest.fn((dict: any) => dict[Platform.OS]);
    });

    it("renders the structure correctly", () => {
        const myLottie = shallow(<LottieNative {...lottieProps} />);
        expect(myLottie).toMatchSnapshot();
    });

    // it("background prop change Styling correctly (View Container)", () => {
    //     const { getByTestId } = render(<LottieViewContainer {...lottieViewProps} />);
    //     const foundContainingView = getByTestId("lottieContainerView");
    //     const { position } = foundContainingView.props.style;
    //     expect(position).toEqual("absolute");
    // });
    // it("Width prop to Equate correctly (Full)", () => {
    //     const windowWidth = Dimensions.get("window").width;
    //     const { getByTestId } = render(<LottieNative {...LottieProps} />);
    //     const foundContainingView = getByTestId("lottieContainerView");
    //     const { width } = foundContainingView.props.style;
    //     expect(width).toEqual(windowWidth);
    // });
    // it("Width prop to Equate correctly (Custom)", () => {
    //     const customWidth = "400";
    //     const { getByTestId } = render(<LottieNative {...LottieProps} width={customWidth} />);
    //     const foundContainingView = getByTestId("lottieContainerView");
    //     const { width } = foundContainingView.props.style;
    //     expect(width).toEqual(parseInt(customWidth));
    // });
    // it("Height prop to Equate correctly (Full)", () => {
    //     const windowHeight = Dimensions.get("window").height;
    //     const { getByTestId } = render(<LottieNative {...LottieProps} />);
    //     const foundContainingView = getByTestId("lottieContainerView");
    //     const { height } = foundContainingView.props.style;
    //     expect(height).toEqual(windowHeight);
    // });
    // it("Height prop to Equate correctly (Custom)", () => {
    //     const customHeight = "400";
    //     const { getByTestId } = render(<LottieNative {...LottieProps} height={customHeight} />);
    //     const foundContainingView = getByTestId("lottieContainerView");
    //     const { height } = foundContainingView.props.style;
    //     expect(height).toEqual(parseInt(customHeight));
    // });
    // it("Loop Observed (Animateur)", () => {
    //     const { getByTestId } = render(<LottieNative {...LottieProps} />);
    //     const anamateur = getByTestId("lottieAnimaterView");
    //     expect(anamateur.props.loop).toEqual(LottieProps.loopAnimation);
    // });
    // it("AutoPlay Observed (Animateur)", () => {
    //     const { getByTestId } = render(<LottieNative {...LottieProps} />);
    //     const anamateur = getByTestId("lottieAnimaterView");
    //     expect(anamateur.props.autoPlay).toEqual(LottieProps.autoPlayAnimation);
    // });
    // it("source JSon Matched Parsed", () => {
    //     const { getByTestId } = render(<LottieNative {...LottieProps} />);
    //     const anamateur = getByTestId("lottieAnimaterView");
    //     expect(anamateur.props.sourceJson).toEqual(json);
    // });
});
