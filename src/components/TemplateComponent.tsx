import { Component, createElement, ReactNode, CSSProperties } from "react";
import Mustache from "mustache";
import { sanitize } from "dompurify";

export type ComponentType = "div" | "span";

export interface TemplateComponentProps {
    template: string;
    data?: object;
    className?: string;
    style?: CSSProperties;
    type?: ComponentType;
    onClick?: () => void;
    onDblClick?: () => void;
}

export class TemplateComponent extends Component<TemplateComponentProps> {
    compile(template: string, data?: object): string {
        return Mustache.render(template, data);
    }

    render(): ReactNode {
        const { template, data, className, style, type, onClick, onDblClick } = this.props;

        if (!template) {
            return null;
        }

        const __html = sanitize(this.compile(template, data));

        if (type && type === "span") {
            return (
                <span
                    style={style}
                    className={className}
                    dangerouslySetInnerHTML={{ __html }}
                    onClick={onClick}
                    onDoubleClick={onDblClick}
                />
            );
        }

        return (
            <div
                style={style}
                className={className}
                dangerouslySetInnerHTML={{ __html }}
                onClick={onClick}
                onDoubleClick={onDblClick}
            />
        );
    }
}
