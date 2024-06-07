import { ReactElement, createElement, CSSProperties } from "react";
import { EditableValue } from "mendix";
import classNames from "classnames";
import { CustomLabelsPreviewType, CustomLabelsType } from "../../typings/AdvancedRadioButtonsProps";

import { Alert } from "./Alert";
import { ControlLabel } from "./ControlLabel";

export interface RadioButtonsProps {
    className?: string;
    style?: CSSProperties;
    id: string;
    tabIndex?: number;
    value: EditableValue<boolean | string>;
    readOnlyAsText: boolean;
    readOnly: boolean;
    formOrientation: string;
    labelWidth?: number;
    orientation: string;
    showLabel: boolean;
    labelCaption?: string | undefined;
    ariaRequired: boolean;
    useCustomLabels: boolean;
    customLabels: CustomLabelsType[] | CustomLabelsPreviewType[];
    removeOtherOptions: boolean;
}

export function RadioButtons(props: RadioButtonsProps): ReactElement {
    const labelledby = `${props.id}-label`;
    const useColumns = props.showLabel && props.formOrientation === "horizontal";
    const hasError =(props.value.validation && props.value.validation.length > 0) || false;
    const radioColumnWidth = props.labelWidth !== undefined ? 12 - props.labelWidth : 12;

    // Setting up classes
    const inlineClass = props.orientation === "horizontal" ? "inline" : "";
    const formOrientationFormGroupClass = useColumns ? "" : "no-columns";
    const hasErrorClass = hasError ? "has-error" : "";
    const formGroupClass = classNames(
        "mx-radiobuttons form-group",
        formOrientationFormGroupClass,
        inlineClass,
        hasErrorClass,
        props.className
    );

    // Preparing control label element, radio or static value element and alert message element
    const formGroupContent: ReactElement[] = [];
    const alertMessageElement = (
        <Alert id={props.id} className="mx-validation-message" bootstrapStyle="danger" message={props.value.validation} />
    );
    if (props.showLabel) {
        const controlLabelElement = (
            <ControlLabel
                id={props.id}
                labelCaption={props.labelCaption}
                customClass={useColumns ? `col-sm-${props.labelWidth}` : ''}
            />
        );
        formGroupContent.push(controlLabelElement);
    }

    // We render this piece when input is not editable and value is shown as a text
    if (props.readOnly && props.readOnlyAsText) {
        let displayValue = props.value.displayValue ? props.value.displayValue : "[No attribute selected]";
        if (props.useCustomLabels && props.value) {
            const customLabel = props.customLabels.find(l => l.attributeValueKey === props.value.value?.toString());
            if (customLabel) {
                displayValue = customLabel.attributeValueNewCaption;
            }
        }

        const formControlStaticElement = <div className="form-control-static">{displayValue}</div>;

        if (useColumns) {
            formGroupContent.push(
                <div className={`col-sm-${radioColumnWidth}`}>
                    {formControlStaticElement}
                    {alertMessageElement}
                </div>
            );
        } else {
            formGroupContent.push(formControlStaticElement);
            formGroupContent.push(alertMessageElement);
        }

        return (
            <div aria-labelledby={labelledby} id={props.id} className={formGroupClass} style={props.style}>
                {formGroupContent}
            </div>
        );
    }

    // We render this piece when input is editable
    const onClickHandler = (newValue: boolean | string): void => {
        props.value.setValue(newValue);
    };
    const singleRadioJSX: ReactElement[] = [];
    let universe: Array<boolean | string> = props.value.universe ? props.value.universe : ["[No attribute selected]"];
    for (let i = 0; i < universe.length; i++) {
        const universeValue = universe[i];
        let radioLabel = universeValue === true ? "Yes" : universeValue === false ? "No" : universeValue;

        if (props.useCustomLabels && props.value.universe) {
            const customLabel = props.customLabels.find(l => l.attributeValueKey === universeValue.toString());
            if (!customLabel && props.removeOtherOptions) {
                continue;
            }
            if (customLabel) {
                radioLabel = customLabel.attributeValueNewCaption;
            }
        }

        // push jsx into array
        singleRadioJSX.push(
            <div className="radio">
                <input
                    id={`${props.id}_${i}`}
                    name={props.id}
                    type="radio"
                    value={universeValue.toString()}
                    disabled={props.readOnly}
                    onClick={() => onClickHandler(universeValue)}
                    checked={props.value.value !== undefined ? props.value.value === universeValue : false}
                    tabIndex={props.tabIndex}
                />
                <label htmlFor={`${props.id}_${i}`}>{radioLabel}</label>
            </div>
        );
    }

    const radioGroupElement = (
        <div
            id={props.id}
            className={classNames("mx-radiogroup")}
            role="radiogroup"
            data-focusindex={props.tabIndex ?? 0}
            aria-labelledby={labelledby}
            aria-required={props.ariaRequired}
        >
            {singleRadioJSX}
        </div>
    );

    if (useColumns) {
        formGroupContent.push(
            <div className={`col-sm-${radioColumnWidth}`}>
                {radioGroupElement}
                {alertMessageElement}
            </div>
        );
    } else {
        formGroupContent.push(radioGroupElement);
        formGroupContent.push(alertMessageElement);
    }

    return (
        <div className={formGroupClass} style={props.style}>
            {formGroupContent}
        </div>
    );
}
