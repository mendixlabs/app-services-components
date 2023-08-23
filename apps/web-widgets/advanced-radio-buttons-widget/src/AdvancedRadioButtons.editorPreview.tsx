import { ReactElement, createElement } from "react";
import { RadioButtons } from "./components/RadioButtons";
import { AdvancedRadioButtonsPreviewProps } from "../typings/AdvancedRadioButtonsProps";

export function preview(props: AdvancedRadioButtonsPreviewProps): ReactElement {
    return (
        <RadioButtons
            className={props.class}
            style={props.styleObject}
            readOnlyAsText={props.readOnlyStyle === "text"}
            readOnly={props.readOnly}
            orientation={props.orientation}
            showLabel={props.showLabel}
            labelCaption={props.labelCaption}
            previewValueAsText={`[${props.attributeValue ? props.attributeValue : "No attribute selected"}]`}
            ariaRequired={props.ariaRequired}
            useCustomLabels={props.useCustomLabels}
            customLabels={props.customLabels}
            removeOtherOptions={props.removeOtherOptions}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/AdvancedRadioButtons.css");
}
