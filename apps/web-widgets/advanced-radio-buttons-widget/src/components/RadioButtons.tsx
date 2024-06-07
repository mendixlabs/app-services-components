import { ReactElement, createElement } from "react";
import classNames from "classnames";

import { Alert } from "./Alert";
import { ControlLabel } from "./ControlLabel";
import { RadioButtonsProps } from "src/userTypes";

export function RadioButtonsNew(props: RadioButtonsProps): ReactElement {
    const labelledby = `${props.id}-label`;
    const radioColumnWidth = props.withControlLabel && props.useColumns ? 12 - props.labelWidth : 12;
    const formGroupClass = classNames(
        "mx-radiobuttons form-group",
        props.withControlLabel && props.useColumns ? "" : "no-columns",
        props.validationMessage && props.validationMessage.length > 0 ? "has-error" : "",
        props.className
    );

    // Preparing control label element, radio or static value element and alert message element
    const formGroupContent: ReactElement[] = [];
    const alertMessageElement = (
        <Alert id={`${props.id}-alert`} className="mx-validation-message" bootstrapStyle="danger" message={props.validationMessage} />
    );
    if (props.withControlLabel) {
        const controlLabelElement = (
            <ControlLabel
                id={`${props.id}-controllabel`}
                labelCaption={props.caption}
                customClass={props.useColumns ? `col-${props.bootsrapBreakpoint}-${props.labelWidth}` : ''}
            />
        );
        formGroupContent.push(controlLabelElement);
    }

    // We render this piece when input is not editable and value is shown as a text
    if (props.isStatic) {
        const formControlStaticElement = <div className="form-control-static">{props.valueText}</div>;

        if (props.withControlLabel && props.useColumns) {
            formGroupContent.push(
                <div className={`col-${props.bootsrapBreakpoint}-${radioColumnWidth}`}>
                    {formControlStaticElement}
                    {alertMessageElement}
                </div>
            );
        } else {
            formGroupContent.push(formControlStaticElement);
            formGroupContent.push(alertMessageElement);
        }

        return (
            <div aria-labelledby={labelledby} id={`${props.id}-formgroup`} className={formGroupClass} style={props.style}>
                {formGroupContent}
            </div>
        );
    } else {
        // We render this piece when input is editable
        const onClickHandler = (newValue: boolean | string): void => {
            props.setValue(newValue);
        };

        const singleRadioJSX: ReactElement[] = [];
        for (let i = 0; i < props.values.length; i++) {
            const valueObject = props.values[i];

            // push jsx into array
            singleRadioJSX.push(
                <div className="radio">
                    <input
                        id={`${props.id}_${i}`}
                        name={props.id}
                        type="radio"
                        value={valueObject.value.toString()}
                        disabled={props.readOnly}
                        onClick={() => onClickHandler(valueObject.value)}
                        checked={valueObject.isChecked}
                        tabIndex={props.tabIndex}
                    />
                    <label htmlFor={`${props.id}_${i}`}>{valueObject.label}</label>
                </div>
            );
        }

        const radioGroupElement = (
            <div
                id={`${props.id}-radiogroup`}
                className={classNames("mx-radiogroup")}
                role="radiogroup"
                data-focusindex={props.tabIndex ?? 0}
                aria-labelledby={labelledby}
                aria-required={props.ariaRequired}
            >
                {singleRadioJSX}
            </div>
        );

        if (props.withControlLabel && props.useColumns) {
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
}
