import { ReactElement, createElement, CSSProperties } from "react";
import { EditableValue } from "mendix";
import classNames from "classnames";
import { CustomLabelsPreviewType, CustomLabelsType } from "../../typings/AdvancedRadioButtonsProps";

export interface RadioButtonsProps {
    className?: string;
    style?: CSSProperties;
    id?: string;
    tabIndex?: number;
    value?: EditableValue<boolean | string>;
    readOnlyAsText: boolean;
    readOnly: boolean;
    previewValueAsText?: string; // only used for Design Mode when not editable and with text read-only style
    orientation: string;
    showLabel: boolean;
    labelCaption?: string | undefined;
    ariaRequired: boolean;
    useCustomLabels: boolean;
    customLabels: CustomLabelsType[] | CustomLabelsPreviewType[];
    removeOtherOptions: boolean;
}

export function RadioButtons(props: RadioButtonsProps): ReactElement {
    const showOnlyText = props.readOnly && props.readOnlyAsText;
    const inlineClass = props.orientation === "horizontal" ? "inline" : "";
    const labelledby = `${props.id}-label`;

    // We render this piece when input is not editable and value is shown as a text
    if (showOnlyText) {
        let displayValue =
            props.value && props.value.displayValue ? props.value.displayValue : props.previewValueAsText;
        if (props.useCustomLabels && props.value) {
            const customLabel = props.customLabels.find(l => l.attributeValueKey === props.value?.value?.toString());
            if (customLabel) {
                displayValue = customLabel.attributeValueNewCaption;
            }
        }

        return (
            <div
                aria-labelledby={labelledby}
                id={props.id}
                className={classNames("mx-radiobuttons form-group no-columns", inlineClass, props.className)}
                style={props.style}
                role="radiogroup"
            >
                {props.showLabel && props.labelCaption && (
                    <label className="control-label" htmlFor={props.id} id={`${props.id}-label`}>
                        {props.labelCaption || ""}
                    </label>
                )}
                <div className="form-control-static">{displayValue}&nbsp;</div>
                {props.value !== undefined && props.value.validation && props.value.validation.length > 0 && (
                    <div id={`${props.id}-error`} className="alert alert-danger mx-validation-message" role={"alert"}>
                        {props.value.validation}
                    </div>
                )}
            </div>
        );
    }

    // We render this piece when input is editable
    const onClickHandler = (newValue: boolean | string): void => {
        if (!props.value) {
            return;
        }
        props.value.setValue(newValue);
    };
    const singleRadioJSX: ReactElement[] = [];
    const universe: Array<boolean | string> =
        props.value && props.value.universe ? props.value.universe : ["[Option 1]", "[Option 2] ..."];
    for (let i = 0; i < universe.length; i++) {
        const universeValue = universe[i];
        let radioLabel = universeValue === true ? "Yes" : universeValue === false ? "No" : universeValue;

        if (props.useCustomLabels && props.value && props.value.universe) {
            const customLabel = props.customLabels.find(l => l.attributeValueKey === universeValue.toString());
            if (customLabel) {
                radioLabel = customLabel.attributeValueNewCaption;
            } else {
                if (props.removeOtherOptions) {
                    break;
                }
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
                    checked={
                        props.value && props.value.value !== undefined ? props.value.value === universeValue : false
                    }
                    tabIndex={props.tabIndex}
                />
                <label htmlFor={`${props.id}_${i}`}>{radioLabel}</label>
            </div>
        );
    }
    return (
        <div
            className={classNames("mx-radiobuttons form-group no-columns", inlineClass, props.className)}
            style={props.style}
        >
            {props.showLabel && props.labelCaption && (
                <label className="control-label" htmlFor={props.id} id={`${props.id}-label`}>
                    {props.labelCaption || ""}
                </label>
            )}
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
            {props.value !== undefined && props.value.validation && props.value.validation.length > 0 && (
                <div id={`${props.id}-error`} className="alert alert-danger mx-validation-message" role={"alert"}>
                    {props.value.validation}
                </div>
            )}
        </div>
    );
}
