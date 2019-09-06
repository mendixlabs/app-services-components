import { MxTreeTableContainerProps } from "../../typings/MxTreeTableProps";

export const validateProps = (props: MxTreeTableContainerProps): string | string[] => {
    const message: string[] = [];

    if ((props.childMethod === "microflow" || props.childMethod === "nanoflow") && !props.childBoolean) {
        message.push("When using a microflow/nanoflow as Child data source, please set get child attribute");
    }
    if (props.childMethod === "microflow" && !props.getChildMf) {
        message.push("When using a microflow as Child data source, child microflow is required");
    }
    if (props.childMethod === "nanoflow" && !props.getChildNf.nanoflow) {
        message.push("When using a nanoflow as Child data source, child nanoflow is required");
    }
    if (props.childMethod === "reference" && !props.childReference) {
        message.push("When using a reference as Child data source, child reference attribute is required");
    }
    if (props.dataSource === "xpath" && !props.nodeEntity) {
        message.push("For the data source 'XPath', the node entity is required");
    }
    if (props.dataSource === "mf" && !props.getDataMf) {
        message.push("For data source option 'microflow', a data source microflow is required");
    }
    if (props.dataSource === "nf" && !props.getDataNf.nanoflow) {
        message.push("For data source option 'nanoflow', a data source nanoflow is required");
    }
    if (props.onClickAction === "mf" && !props.onClickMf) {
        message.push("On click microflow missing");
    }
    if (props.onClickAction === "nf" && !props.onClickNf.nanoflow) {
        message.push("On click nanoflow missing");
    }
    if (props.onClickAction === "open" && !props.onClickForm) {
        message.push("On click page missing");
    }
    if (props.onDblClickAction === "mf" && !props.onDblClickMf) {
        message.push("On double click microflow missing");
    }
    if (props.onDblClickAction === "nf" && !props.onDblClickNf.nanoflow) {
        message.push("On double click nanoflow missing");
    }
    if (props.onDblClickAction === "open" && !props.onDblClickForm) {
        message.push("On double click page missing");
    }
    // if (
    //     props.selectMode !== "none" &&
    //     (!props.selectMicroflow && !props.selectNanoflow.nanoflow && !props.selectEntityReference)
    // ) {
    //     message.push("When selection mode is set, please set selection reference/nanoflow or microflow");
    // }
    if (props.columnMethod !== "static") {
        if (!props.columnHeaderEntity) {
            message.push("When using dynamic columns, please define the column entity");
        }
        if (!props.columnHeaderLabelAttribute) {
            message.push("Column label attribute is not defined!");
        }
        if (!props.columnHeaderAttrAttribute) {
            message.push("Column Attribute attribute is not defined!");
        }
    }
    if (props.columnMethod === "microflow" && !props.columnHeaderMicroflow) {
        message.push("Column microflow is not defined!");
    }
    // if (props.columnMethod === "nanoflow" && !props.columnHeaderNanoflow.nanoflow) {
    //     message.push("Column nanoflow is not defined!");
    // }

    if (message.length === 0) {
        return "";
    }
    if (message.length === 1) {
        return message[0];
    }

    return message;
};
