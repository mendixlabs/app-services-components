import { createElement, Fragment, FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";

import DroppableItem from "./components/DroppableItem";
import DroppableArea from "./components/DroppableArea";
import ScrollHelper from "./components/ScrollHelper";
import MyDragProvider from "./components/MyDragProvider";
import DragPreview from "./components/DragPreview";

import "./ui/DndWidget.scss";

import { ValueStatus } from "mendix";
import type { OnDropTypes, Type_Parsed_Incoming_Data } from "./userTypes";
import type { DraganddropwidgetContainerProps } from "../typings/DraganddropwidgetProps";

const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

const DndWidget: FunctionComponent<DraganddropwidgetContainerProps> = props => {
    // Sort Incoming Data
    props.incomingData.setSortOrder([[props.sortOn.id, props.sort]]);

    const IF_NO_PARENT_UUID = useMemo(() => nanoid(), []);
    const END_ID = useMemo(() => nanoid(), []);

    const arrayOfAcceptedUUids = useMemo(() => props.acceptedUuid.flatMap(x => [x.uuids.trim()]), [props.acceptedUuid]);

    const uuidParent = useMemo(() => {
        return props.isParent
            ? props.uuidStringParentExpression?.value
                ? props.uuidStringParentExpression?.value
                : IF_NO_PARENT_UUID
            : props.uuidStringParent?.value;
    }, [props.uuidStringParentExpression]);

    const htmlElRef = useRef<HTMLDivElement | null>(null);
    const parentContainerName = useRef<HTMLDivElement | null>(null);
    const [allData, setAllData] = useState<Type_Parsed_Incoming_Data[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(true); // Is used to reset Widget on Keyboard use to prevent fallover  a11y backend
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isOverIndex, setIsOverIndex] = useState<null | number>(null);

    /**
     * We give a Child comp a way to get its parents parent. NOTE: This will only ever work 2n and does not recalculate on Window resize
     */
    useEffect(() => {
        if (uuidParent) {
            const myParent = document.querySelectorAll(`[data-uuid="${uuidParent}"]`);
            if (myParent.length) {
                // @ts-ignore
                const containerName = myParent[0]?.attributes["data-containing-uuid"].value;
                if (containerName) {
                    parentContainerName.current = document.getElementById(containerName) as HTMLDivElement;
                }
            }
        }
    }, [uuidParent]);

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
                        ariaOfParent: props.readParentTitle,
                        ariaTitle: props.readTitle?.get(c).value,
                        uuidContainer: props.uuidStringContainer,
                        uuidCurrent: props.uuidStringCurrent.get(c).value
                    }
                ];
            }, []);
            setAllData(allData);
        }
    }

    /**
     * To Help with A11y
     */
    const ent = () => {
        if (htmlElRef && htmlElRef.current) {
            const isFocusInDiv = htmlElRef.current.contains(document.activeElement);
            if (isFocusInDiv) {
                setIsLoaded(false);
                setTimeout(() => {
                    setIsLoaded(true);
                }, 0);
            }
        }
    };
    useEffect(() => {
        if (props.isParent) {
            document.addEventListener("keyup", e => {
                if (e.code === "Enter" || e.code === "Escape") {
                    ent();
                }
            });
        }
        return () => {
            document.removeEventListener("keyup", () => {});
        };
    }, []);

    const onDrop = useCallback(
        (params: OnDropTypes) => {
            const findCurrentArray = allData.findIndex(item => {
                return params.draggedUUID === item.uuidCurrent;
            });

            if (params.currentParentUUID === params.droppedOnParentUUID) {
                console.log("1params", params);
                // We update the Display state independently from calling Mendix otherwise it causes odd Visual issues
                const result = Array.from(allData);
                const [removed] = result.splice(findCurrentArray, 1);
                result.splice(params.index, 0, removed);

                // setAllData(result); // Update Local State to give the impression of ... SPEED 🦥
                const stringifyJson = JSON.stringify(params);
                props.widgetJsonState.setValue(stringifyJson);
                if (props.sameParentAction?.canExecute) {
                    props.sameParentAction.execute();
                }
            }

            if (params.currentParentUUID !== params.droppedOnParentUUID) {
                console.log("2params", params);
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

    if ((props.incomingData.status === ValueStatus.Loading && !allData.length) || !isLoaded) {
        return <div>Loading..</div>;
    }
    return (
        <MyDragProvider uuidStringContainer={props.uuidStringContainer} isFirefox={isFirefox}>
            <ScrollHelper
                parentContainerName={parentContainerName}
                isDragging={isDragging}
                isColumn={props.isColumn}
                acceptedUUids={arrayOfAcceptedUUids}
                droppedOnUUID={props.uuidStringContainer}
                uuidStringParent={uuidParent as string}
            >
                <Fragment>
                    <div
                        ref={htmlElRef}
                        style={{
                            display: "flex",
                            width: "100%",
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
                                            canDrag={props.disableDrag.value as boolean}
                                            isDragging={isDragging}
                                            isColumn={props.isColumn}
                                            setIsDragging={setIsDragging}
                                            setIsOverIndex={setIsOverIndex}
                                            acceptedUUids={arrayOfAcceptedUUids}
                                            droppedOnUUID={props.uuidStringContainer}
                                            uuidStringParent={props.uuidStringParent?.value as string}
                                        >
                                            {props.hasDataContent.get(item.item)}
                                        </DroppableItem>
                                    );
                                })
                            ) : (
                                <Fragment></Fragment>
                            )}
                        </Fragment>
                    </div>
                    <DroppableArea
                        id={END_ID}
                        index={-1}
                        onDrop={onDrop}
                        isColumn={props.isColumn}
                        acceptedUUids={arrayOfAcceptedUUids}
                        droppedOnUUID={props.uuidStringContainer}
                        uuidStringParent={uuidParent as string}
                    >
                        {!allData.length && props.hasNoDataContent}
                    </DroppableArea>
                </Fragment>
            </ScrollHelper>
            {!isFirefox ? <DragPreview displayItem={props.hasDataContent} {...props} /> : ""}
        </MyDragProvider>
    );
};

export default DndWidget;
