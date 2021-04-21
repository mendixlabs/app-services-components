import { Component, ReactNode, createElement } from "react";
import classNames from "classnames";
import { ValidationMessage } from "@jeltemx/mendix-react-widget-utils/lib/validation";
import { observer } from "mobx-react";

type TypeBootstrapStyle = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export interface AlertProps {
    validationMessages: ValidationMessage[];
    remove: (guid: string) => void;
}

@observer
export class Alerts extends Component<AlertProps, {}> {
    render(): ReactNode {
        if (!this.props.validationMessages) {
            return null;
        }

        const { validationMessages } = this.props;

        return (
            <ul className={classNames("alerts")}>{validationMessages.map(message => this.renderMessage(message))}</ul>
        );
    }

    private renderMessage(message: ValidationMessage): ReactNode {
        const bootstrapStyle: TypeBootstrapStyle = message.fatal ? "danger" : "warning";
        const msg = message.fatal ? `Dynamic Table error: ${message.message}` : message.message;
        return (
            <li key={message.id}>
                <div className={`alert alert-${bootstrapStyle}`}>
                    {this.renderCloseButton(message)}
                    {msg}
                </div>
            </li>
        );
    }

    private renderCloseButton(message: ValidationMessage): ReactNode {
        if (message.fatal) {
            return null;
        }
        const { remove } = this.props;
        const onClick: () => void = () => {
            remove(message.id);
        };
        return (
            <button type="button" className="close" aria-label="Close" onClick={onClick}>
                <span aria-hidden="true">&times;</span>
            </button>
        );
    }
}
