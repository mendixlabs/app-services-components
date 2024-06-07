import { ReactElement, createElement } from "react";
import { RadioButtonsNew } from "./components/RadioButtons";
import { generateUUID } from "./utils/generateUUID";
import { prepareControlLabelParams, prepareValuesParam } from "./utils/paramUtils";

import { AdvancedRadioButtonsContainerProps } from "typings/AdvancedRadioButtonsProps";

import "./ui/AdvancedRadioButtons.css";

export function AdvancedRadioButtons(props: AdvancedRadioButtonsContainerProps): ReactElement {
    const generatedId = generateUUID().toString();

    const controlLabelParams = prepareControlLabelParams(props);
    const valueObject = prepareValuesParam(props);

    let customClass = props.class;
    if (props.orientation == "horizontal") {
        customClass += ' inline'
    }

    let valueText = props.attributeValue.value === true ? "Yes" : "No";
    if (props.useCustomLabels && props.customLabels) {
        let customRadioLabel = props.customLabels.find(cl => cl.attributeValueKey == props.attributeValue.value?.toString());
        if (customRadioLabel) {
            valueText = customRadioLabel.attributeValueNewCaption;
        }
    }


    if (props.attributeValue.readOnly && props.readOnlyStyle === "text") {
        return (
            <RadioButtonsNew
                id={`${generatedId}`}
                validationMessage={""}
                className={customClass}
    
                {...controlLabelParams}
    
                isStatic={true}
                valueText={valueText}
            />
        );
    }

    return (
        <RadioButtonsNew
            id={`${generatedId}-${props.name}`}
            validationMessage={props.attributeValue.validation}
            className={customClass}
            style={props.style}

            {...controlLabelParams}

            isStatic={false}

            tabIndex={props.tabIndex || -1}
            ariaRequired={props.ariaRequired}

            readOnly={props.attributeValue.readOnly}
            setValue={props.attributeValue.setValue}
            values={valueObject}
        />
    );
}
