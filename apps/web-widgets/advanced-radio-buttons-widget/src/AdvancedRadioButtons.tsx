import { ReactElement, createElement, useId } from "react";
import { RadioButtons } from "./components/RadioButtons";

import { AdvancedRadioButtonsContainerProps } from "../typings/AdvancedRadioButtonsProps";

import "./ui/AdvancedRadioButtons.css";

export function AdvancedRadioButtons(props: AdvancedRadioButtonsContainerProps): ReactElement {
    return (
        <RadioButtons
            id={`${useId()}-${props.name}`}
            className={props.class}
            style={props.style}
            value={props.attributeValue}
            readOnlyAsText={props.readOnlyStyle === "text"}
            readOnly={props.attributeValue.readOnly}
            tabIndex={props.tabIndex}
            orientation={props.orientation}
            showLabel={props.showLabel}
            labelCaption={props.labelCaption?.value}
            ariaRequired={props.ariaRequired}
            useCustomLabels={props.useCustomLabels}
            customLabels={props.customLabels}
            removeOtherOptions={props.removeOtherOptions}
        />
    );
}
