import { ReactElement, createElement } from "react";
import { AdvancedRadioButtonsPreviewProps } from "../typings/AdvancedRadioButtonsProps";
import { RadioButtonsNew } from "./components/RadioButtons";
import { generateUUID } from "./utils/generateUUID";
import { prepareControlLabelParams, preparePreviewValuesParam } from "./utils/paramUtils";

export function preview(props: AdvancedRadioButtonsPreviewProps): ReactElement {
    const generatedId = generateUUID().toString();

    const controlLabelParams = prepareControlLabelParams(props);
    const valueObject = preparePreviewValuesParam(props);

    let customClass = props.class;
    if (props.orientation == "horizontal") {
        customClass += ' inline'
    }

    if (props.readOnly && props.readOnlyStyle === "text" || !props.attributeValue) {
        return (
            <RadioButtonsNew
                id={`${generatedId}`}
                validationMessage={""}
                className={customClass}
    
                {...controlLabelParams}
    
                isStatic={true}
                valueText={props.attributeValue ? `[${props.attributeValue}]` : "[No attribute selected]"}
            />
        );
    }

    return (
        <RadioButtonsNew
            id={`${generatedId}`}
            validationMessage={""}
            className={customClass}

            {...controlLabelParams}

            isStatic={false}

            tabIndex={-1}
            ariaRequired={props.ariaRequired}

            readOnly={props.readOnly}
            setValue={() => {return}}
            values={valueObject}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/AdvancedRadioButtons.css");
}

