import { ReactElement, createElement } from "react"; 
import classNames from "classnames";
import { RadioLabelProps } from "src/userTypes";

export function ControlLabel(props: RadioLabelProps): ReactElement {
    let classNameString = "control-label";
    if (props.customClass && props.customClass.length) {
        classNameString = classNames("control-label", props.customClass);
    }

    return (
        <label className={classNameString} htmlFor={props.id} id={`${props.id}-label`}>
            {props.labelCaption || ""}
        </label>
    );
}