import { SFC, createElement } from "react";
import classNames from "classnames";

export interface AlertProps {
    message?: string | string[];
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";
}

export const Alert: SFC<AlertProps> = ({ className, bootstrapStyle, message }) =>
    message
        ? createElement(
              "div",
              { className: classNames(`alert alert-${bootstrapStyle}`, className) },
              Array.isArray(message) ? createElement("ul", {}, message.map(m => createElement("li", {}, m))) : message
          )
        : null;

Alert.displayName = "Alert";
