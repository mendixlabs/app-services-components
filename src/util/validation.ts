import { MxTreeTableContainerProps } from "../../typings/MxTreeTableProps";
import { ValidationMessage } from "@jeltemx/mendix-react-widget-utils/lib/validation";

export interface ExtraMXValidateProps {
    helperObjectPersistence?: boolean;
}

export const validateProps = (
    props: MxTreeTableContainerProps,
    extraProps: ExtraMXValidateProps = {}
): ValidationMessage[] => {
    const messages: ValidationMessage[] = [];
    const conditionalValidation = (condition: boolean, category: string, msg: string): void => {
        if (condition) {
            messages.push(new ValidationMessage(`${category} :: ${msg}`));
        }
    };

    if (extraProps) {
        if (extraProps.helperObjectPersistence) {
            messages.push(new ValidationMessage("Helper object cannot be a persistent entity!"));
        }
    }

    conditionalValidation(
        (props.childMethod === "microflow" || props.childMethod === "nanoflow") && !props.childBoolean,
        "Data Children",
        "When using a microflow/nanoflow as Child data source, please set get child attribute"
    );

    conditionalValidation(
        props.childMethod === "microflow" && !props.getChildMf,
        "Data Children",
        "When using a microflow as Child data source, child microflow is required"
    );

    conditionalValidation(
        props.childMethod === "nanoflow" && !props.getChildNf.nanoflow,
        "Data Children",
        "When using a nanoflow as Child data source, child nanoflow is required"
    );

    conditionalValidation(
        props.childMethod === "reference" && !props.childReference,
        "Data Children",
        "When using a reference as Child data source, child reference attribute is required"
    );

    conditionalValidation(
        props.dataSource === "xpath" && !props.nodeEntity,
        "Data",
        "For the data source 'XPath', the node entity is required"
    );

    conditionalValidation(
        props.dataSource === "mf" && !props.getDataMf,
        "Data",
        "For data source option 'microflow', a data source microflow is required"
    );

    conditionalValidation(
        props.dataSource === "nf" && !props.getDataNf.nanoflow,
        "Data",
        "For data source option 'nanoflow', a data source nanoflow is required"
    );

    conditionalValidation(
        props.loadScenario === "all" && props.nodeIsRootAttr === "",
        "Data",
        "When load scenario is set to 'Whole Tree', the widget needs to know which elements are root. Please set the Root attribute"
    );

    conditionalValidation(
        props.loadScenario === "all" && !props.childReference,
        "Data",
        "When load scenario is set to 'Whole Tree', you will need to set the Child Reference (see Data Children), otherwise it won't work"
    );

    conditionalValidation(props.onClickAction === "mf" && !props.onClickMf, "Events", "On click microflow missing");

    conditionalValidation(
        props.onClickAction === "nf" && !props.onClickNf.nanoflow,
        "Events",
        "On click nanoflow missing"
    );

    conditionalValidation(props.onClickAction === "open" && !props.onClickForm, "Events", "On click page missing");

    conditionalValidation(
        props.onDblClickAction === "mf" && !props.onDblClickMf,
        "Events",
        "On double click microflow missing"
    );

    conditionalValidation(
        props.onDblClickAction === "nf" && !props.onDblClickNf.nanoflow,
        "Events",
        "On double click nanoflow missing"
    );

    conditionalValidation(
        props.onDblClickAction === "open" && !props.onDblClickForm,
        "Events",
        "On double click page missing"
    );

    conditionalValidation(
        props.columnMethod === "static" && (!props.columnList || props.columnList.length === 0),
        "Columns (List)",
        "Column is set to a List, but there are no columns defined"
    );

    if (props.columnMethod === "static") {
        props.columnList.forEach(staticColumn => {
            conditionalValidation(
                staticColumn.columnTitleType === "attr" && !staticColumn.columnAttr,
                "Columns (List)",
                "Static column Title type is set to Attribute, but no attribute is defined" +
                    (staticColumn.columnHeader !== "" ? ", caption: " + staticColumn.columnHeader : "")
            );
            conditionalValidation(
                staticColumn.columnTitleType === "nanoflow" &&
                    !(staticColumn.transformNanoflow && staticColumn.transformNanoflow.nanoflow),
                "Columns (List)",
                "Static column Title type is set to Nanoflow, but no nanoflow is defined" +
                    (staticColumn.columnHeader !== "" ? ", caption: " + staticColumn.columnHeader : "")
            );
        });
    } else {
        conditionalValidation(!props.columnHeaderEntity, "Columns (Dynamic)", "Column entity is not defined");
        conditionalValidation(
            !props.columnHeaderLabelAttribute,
            "Columns (Dynamic)",
            "Column label attribute is not defined"
        );
        conditionalValidation(
            !props.columnHeaderAttrAttribute,
            "Columns (Dynamic)",
            "Column Attribute attribute is not defined"
        );
        conditionalValidation(
            props.columnMethod === "microflow" && !props.columnHeaderMicroflow,
            "Columns (Dynamic)",
            "Column microflow is not defined"
        );
    }

    if (
        (props.onClickAction !== "nothing" && props.onClickAction !== "open") ||
        (props.onDblClickAction !== "nothing" && props.onDblClickAction !== "open") ||
        (props.selectMode !== "none" && props.selectActionButtons.length > 0) ||
        props.selectOnChangeAction !== "nothing"
    ) {
        conditionalValidation(
            !props.helperEntity,
            "Helper",
            "For click/double click/selections a helper object needs to be configured"
        );
    }

    if (props.helperEntity !== "") {
        conditionalValidation(
            !props.helperContextReference,
            "Helper",
            "Helper object needs a reference to your context object"
        );
        conditionalValidation(
            !props.helperNodeReference,
            "Helper",
            "Helper object needs a reference set to your node objects"
        );
    }

    if (props.selectActionButtons.length > 0) {
        props.selectActionButtons.forEach(button => {
            if (button.selectABAction === "mf" && !button.selectABMicroflow) {
                messages.push(
                    new ValidationMessage(
                        `Selection -> Buttonbar -> Button with label '${button.selectABLabel}' should have a microflow configured`
                    )
                );
            } else if (button.selectABAction === "nf" && !button.selectABNanoflow.nanoflow) {
                messages.push(
                    new ValidationMessage(
                        `Selection -> Buttonbar -> Button with label '${button.selectABLabel}' should have a nanoflow configured`
                    )
                );
            }
        });
    }

    if (props.inlineActionButtons.length > 0) {
        props.inlineActionButtons.forEach(button => {
            if (button.actionButtonOnClickAction === "mf" && !button.actionButtonOnClickMf) {
                messages.push(
                    new ValidationMessage("Column -> Inline Buttons -> Button should have a microflow configured")
                );
            } else if (button.actionButtonOnClickAction === "nf" && !button.actionButtonOnClickNf.nanoflow) {
                messages.push(
                    new ValidationMessage("Column -> Inline Buttons -> Button should have a nanoflow configured")
                );
            } else if (button.actionButtonOnClickAction === "open" && !button.actionButtonOnClickForm) {
                messages.push(
                    new ValidationMessage("Column -> Inline Buttons -> Button should have a page configured")
                );
            }
        });
    }

    return messages;
};
