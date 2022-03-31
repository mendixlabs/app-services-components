import { createElement, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd-multi-backend";
import { v4 as uuidv4 } from "uuid";
import "./ui/DndWidget.scss";

import DroppableItem from "./components/DroppableItem";
import DroppableArea from "./components/DroppableArea";

import { useCallMicroflowOnButton } from "./utils/useCallMicroflowOnButton";
import { DND_OPTIONS, getClassNames } from "./utils/general";
import { ValueStatus } from "mendix";

import { DndWidgetContainerProps } from "../typings/DndWidgetProps";
import { OnDropTypes, Type_Parsed_Incoming_Data } from "./userTypes";
import DragPreview from "./components/DragPreview";

const IF_NO_PARENT_UUID = uuidv4();
const DndWidget = (props: DndWidgetContainerProps) => {
    // Sort
    props.incomingData.setSortOrder([[props.sortOn.id, props.sortAsc ? "asc" : "desc"]]);
    const uuidParent = props.uuidStringParent ? props.uuidStringParent.value : IF_NO_PARENT_UUID;
    const [allData, setAllData] = useState<Type_Parsed_Incoming_Data[]>([]);
    const [acceptedUUids, setAcceptedUUids] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const isA11yBackend = useCallMicroflowOnButton(true);
    const [isOverIndex, setIsOverIndex] = useState<null | number>(null);
    const classNames = useMemo(() => getClassNames(props.uuidStringContainer), [props.uuidStringContainer]);

    function setUpData() {
        if (props.incomingData.status === ValueStatus.Available) {
            const allData: Type_Parsed_Incoming_Data[] = props.incomingData.items?.reduce((a: any, c) => {
                return [
                    ...a,
                    {
                        id: c.id,
                        item: c,
                        uuidParent,
                        isNewInHere: false,
                        uuidContainer: props.uuidStringContainer,
                        uuidCurrent: props.uuidStringCurrent.get(c).value
                    }
                ];
            }, []);
            setAllData(allData);
        }
    }

    useEffect(() => {
        const arrayOfAcceptedUUids = props.acceptedUuid.flatMap(x => [x.uuids]);
        setAcceptedUUids(arrayOfAcceptedUUids);
    }, [props.acceptedUuid]);

    const onDrop = useCallback(
        (params: OnDropTypes) => {
            const findCurrentArray = allData.findIndex(item => {
                return params.draggedUUID === item.uuidCurrent;
            });

            if (params.currentParentUUID === params.droppedOnParentUUID) {
                console.log(`Same`, params);
                // We update the Display state independently from calling Mendix otherwise it causes odd Visual issues
                const result = Array.from(allData);
                const [removed] = result.splice(findCurrentArray, 1);
                result.splice(params.index, 0, removed);

                setAllData(result); // Update Local State to give the impression of ... SPEED
                const stringifyJson = JSON.stringify(params);
                props.widgetJsonState.setValue(stringifyJson);
                if (props.sameParentAction?.canExecute) {
                    props.sameParentAction.execute();
                }
            }

            if (params.currentParentUUID !== params.droppedOnParentUUID) {
                console.log(`Diff`, params);
                const stringifyJson = JSON.stringify(params);
                props.widgetJsonState.setValue(stringifyJson);
                if (props.newParentAction?.canExecute) {
                    props.newParentAction.execute();
                }
            }
        },
        [allData, props.widgetJsonState]
    );

    useEffect(() => {
        setUpData();
    }, [props.incomingData]);

    if (props.incomingData.status === ValueStatus.Loading && !allData.length) {
        return <div>Loading..</div>;
    }
    // DND_OPTIONS(props.uuidStringContainer)
    return (
        <div className={`${props.uuidStringContainer}`}>
            <DndProvider
                // @ts-ignore
                options={DND_OPTIONS(props.uuidStringContainer)}
            >
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: props.isColumn ? "column" : "row"
                    }}
                    className={`
                     ${
                         isDragging
                             ? classNames.dnd_draggable_container_dragging
                             : classNames.dnd_draggable_container_not_dragging
                     }
                    `}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: props.isColumn ? "column" : "row"
                        }}
                    >
                        <Fragment>
                            {allData.length ? (
                                allData?.map((item, index) => {
                                    return (
                                        <DroppableItem
                                            item={item}
                                            key={item.id}
                                            id={item.id}
                                            index={index}
                                            onDrop={onDrop}
                                            allData={allData}
                                            isOverIndex={isOverIndex}
                                            isDragging={isDragging}
                                            isColumn={props.isColumn}
                                            acceptedUUids={acceptedUUids}
                                            setIsDragging={setIsDragging}
                                            setIsOverIndex={setIsOverIndex}
                                            isA11yBackend={isA11yBackend}
                                            droppedOnUUID={props.uuidStringContainer}
                                            uuidStringParent={props.uuidStringParent?.value as string}
                                        >
                                            {props.hasDataContent.get(item.item)}
                                        </DroppableItem>
                                    );
                                })
                            ) : (
                                <DroppableArea
                                    key={uuidv4()}
                                    id={uuidv4()}
                                    index={-1}
                                    onDrop={onDrop}
                                    isColumn={props.isColumn}
                                    acceptedUUids={acceptedUUids}
                                    droppedOnUUID={props.uuidStringContainer}
                                    uuidStringParent={uuidParent as string}
                                >
                                    {props.hasNoDataContent}
                                </DroppableArea>
                            )}
                        </Fragment>
                    </div>
                    <DroppableArea
                        id={uuidv4()}
                        index={-1}
                        onDrop={onDrop}
                        isColumn={props.isColumn}
                        acceptedUUids={acceptedUUids}
                        droppedOnUUID={props.uuidStringContainer}
                        uuidStringParent={uuidParent as string}
                    />
                </div>
                <DragPreview displayItem={props.hasDataContent} {...props} />
            </DndProvider>
        </div>
    );
};

export default DndWidget;
