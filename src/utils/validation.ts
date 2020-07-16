import { TreeViewContainerProps } from "../../typings/TreeViewProps";
import { ValidationMessage, ValidationStrings as STR } from "@jeltemx/mendix-react-widget-utils/lib/validation";

export interface ValidateExtraProps {
    noPersistentHelper?: boolean;
}

export const validateProps = (
    props: TreeViewContainerProps
    // _extraProps: ValidateExtraProps = {}
): ValidationMessage[] => {
    const messages: ValidationMessage[] = [];
    const conditionalValidation = (condition: boolean, category: string, msg: string): void => {
        if (condition) {
            messages.push(new ValidationMessage(`${category} :: ${msg}`));
        }
    };

    // Data Source

    conditionalValidation(
        props.nodeDataSource === "microflow" && !props.nodeGetDataMicroflow,
        "Data Source",
        "Data source microflow not configured"
    );
    conditionalValidation(
        props.nodeDataSource === "nanoflow" && !(props.nodeGetDataNanoflow && props.nodeGetDataNanoflow.nanoflow),
        "Data Source",
        "Data source nanoflow not configured"
    );

    // UI

    conditionalValidation(
        props.uiNodeTitleType === "attribute" && !props.uiNodeTitleAttr,
        "UI",
        "Title attribute not defined"
    );
    conditionalValidation(
        props.uiNodeTitleType === "nanoflow" && !props.uiNodeTitleNanoflow.nanoflow,
        "UI",
        "Title Nanoflow not defined"
    );

    // Relation

    conditionalValidation(
        props.relationType === "nodeParent" && !props.relationNodeParent,
        "Relation",
        "No Parent ref configured"
    );
    conditionalValidation(
        props.relationType === "nodeParent" &&
            props.nodeLoadScenario === "top" &&
            !props.relationNodeParentHasChildAttr,
        "Relation",
        "The relation is Node - Parent, loading is set to 'partial', but there is not \"Has Child\" configured"
    );
    conditionalValidation(
        props.relationType === "nodeChildren" && !props.relationChildReference,
        "Relation",
        "No Child reference configured"
    );

    // All Data

    conditionalValidation(
        props.nodeLoadScenario === "all" && !props.nodeIsRootAttr,
        "All data",
        "When loading a complete tree, the Root attribute needs to be set"
    );

    // Top-level

    if (props.nodeLoadScenario === "top") {
        conditionalValidation(
            props.childScenario === "reference" && !props.relationChildReference,
            "Top-level",
            "When loading data through a reference, the Child reference set should be configured"
        );
        if (props.childScenario === "action") {
            conditionalValidation(
                props.relationType === "nodeParent" && !props.relationNodeParentHasChildAttr,
                "Top-level",
                "When using an action to load children, you will need to configure the has child attribute (node-parent"
            );
            conditionalValidation(
                props.childActionMethod === "microflow" && !props.childActionMicroflow,
                "Top-level",
                "No Microflow configured for retrieving child nodes"
            );
            conditionalValidation(
                props.childActionMethod === "nanoflow" &&
                    !(props.childActionNanoflow && props.childActionNanoflow.nanoflow),
                "Top-level",
                "No Nanoflow configured for retrieving child nodes"
            );
        }
    }

    // Drag drop

    conditionalValidation(
        props.dragIsDraggable && props.relationType === "nodeChildren",
        "Drag Drop",
        "Drag & Drop is only allowed when you have a Node-Parent relation"
    );

    // Events

    conditionalValidation(
        props.eventNodeOnClickAction === "microflow" && !props.eventNodeOnClickMicroflow,
        "Events: Node",
        STR.ACTION_MF
    );
    conditionalValidation(
        props.eventNodeOnClickAction === "nanoflow" && !props.eventNodeOnClickNanoflow.nanoflow,
        "Events: Node",
        STR.ACTION_NF
    );
    conditionalValidation(
        props.eventNodeOnClickAction === "open" && !props.eventNodeOnClickForm,
        "Events: Node",
        STR.ACTION_PAGE
    );

    // Search

    return messages;
};
