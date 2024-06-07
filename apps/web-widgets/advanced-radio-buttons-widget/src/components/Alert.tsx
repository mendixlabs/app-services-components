import { ReactElement, createElement, Fragment } from "react";
import classNames from "classnames";
import { AlertProps } from "src/userTypes";

export function Alert({id, message, className, bootstrapStyle }: AlertProps): ReactElement {
    if (!message) {
        return <Fragment></Fragment>;
    }
    return <div
        id={`${id}-error`}
        className={classNames(`alert alert-${bootstrapStyle}`, className)}
        role={"alert"}
    >
        {message}
    </div>;
}
