import { Component, ReactNode, createElement, Fragment } from "react";
import DragInit from "./components/DragInit";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { attribute, equals, literal } from "mendix/filters/builders";

import { DraganddropwidgetContainerProps } from "../typings/DraganddropwidgetProps";

import { CompState, NewElementDraggedIn, ReorderAfterDropTypes } from "./components/types";

import { isTouchDevice, backendOptions } from "./utils";

import "./ui/Draganddropwidget.css";

export default class Draganddropwidget extends Component<DraganddropwidgetContainerProps, CompState> {
    constructor(props: DraganddropwidgetContainerProps) {
        super(props);
        this.state = { listOfSortableItems: [] };
    }
    componentDidMount() {
        const { incomingData, autoSortFilter, sortOn, filterOn, uuid } = this.props;
        // Added in V1.0.2 for Mendix 9.3
        if (autoSortFilter && sortOn.sortable) {
            // Auto Sorts List
            if (sortOn.sortable) {
                incomingData.setSortOrder([[sortOn.id, "asc"]]);
            }
            // Auto Filter List
            if (filterOn.filterable) {
                if (filterOn.universe?.includes(uuid)) {
                    const filterCondition = equals(attribute(filterOn.id), literal(uuid));
                    incomingData.setFilter(filterCondition);
                } else {
                    console.error("uuid does not match enum - Please make sure uuid matches Enum used");
                }
            } else {
                console.warn("Attribute is not filterable");
            }
        }
        if (this.props.autoSortFilter && !sortOn.sortable) {
            console.error(
                "Mendix Version Too Low for Auto Sort/Filter. Mendix 9.3 and Up Only. See Here (https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis-list-values#listvalue-sorting)"
            );
        }
    }

    componentDidUpdate(pP: DraganddropwidgetContainerProps): void {
        const { listOfSortableItems } = this.state;
        const { incomingData } = this.props;
        if (
            (incomingData.items && incomingData.items?.length !== listOfSortableItems.length) ||
            incomingData.items?.length !== pP.incomingData.items?.length
        ) {
            this.setMendixData();
        }
        if (incomingData.status === "available" && pP.incomingData.status === "loading") {
            this.setMendixData();
        }
    }
    setMendixData = (): void => {
        const orderList = this.props.incomingData.items?.reduce((a: any, c) => {
            return [...a, { id: c.id, item: c, uuid: this.props.uuid }];
        }, []);
        this.setState({
            listOfSortableItems: orderList
        });
    };

    reorderAfterDrop = ({ currentItem, index }: ReorderAfterDropTypes): void => {
        const { listOfSortableItems } = this.state;
        const { uuid, dropDataAttr, onDropAction, onDifferentColumDrop, dataSourceName } = this.props;
        if (uuid !== currentItem.item.uuid) {
            // Diff Col Drop
            const settingsForSave: NewElementDraggedIn = {
                modelToSaveFrom: dataSourceName, // Was needed for Drop from Different DS  (Not Supported Anymore)
                dataSourceName,
                whereToPut: index,
                item: currentItem,
                comingTo: uuid,
                comingFrom: currentItem.item.uuid
            };
            // Clone Array
            const listToMendix = Array.from(listOfSortableItems);
            // Add New Object Into Cloned Array
            listToMendix.splice(index, 0, currentItem.item);
            const jsonString = JSON.stringify({ settingsForSave, listToMendix });
            // Set json to non Persist Object
            dropDataAttr.setValue(jsonString);
            if (onDifferentColumDrop && onDifferentColumDrop.canExecute && !onDifferentColumDrop.isExecuting) {
                onDifferentColumDrop.execute();
            }
        } else {
            // Same Col Drop (Re Order)

            const movedItem = listOfSortableItems.find(item => item.id === currentItem.item.id);

            const removedItemList = listOfSortableItems.filter(item => item.id !== currentItem.item.id);
            if (movedItem) {
                removedItemList.splice(index, 0, movedItem);
                this.setState({ listOfSortableItems: removedItemList });
                const jsonString = JSON.stringify(removedItemList);
                dropDataAttr.setValue(jsonString);
                if (onDropAction && onDropAction.canExecute && !onDropAction.isExecuting) {
                    onDropAction.execute();
                }
            }
        }
    };

    render(): ReactNode {
        const { listOfSortableItems } = this.state;
        const { content, emptyData } = this.props;
        if (listOfSortableItems) {
            if (isTouchDevice()) {
                return (
                    <DndProvider backend={TouchBackend} options={backendOptions}>
                        <DragInit
                            content={content}
                            emptyData={emptyData}
                            reorderAfterDrop={this.reorderAfterDrop}
                            listOfSortableItems={listOfSortableItems}
                        />
                    </DndProvider>
                );
            } else {
                return (
                    <Fragment>
                        <DndProvider backend={HTML5Backend}>
                            <DragInit
                                content={content}
                                emptyData={emptyData}
                                reorderAfterDrop={this.reorderAfterDrop}
                                listOfSortableItems={listOfSortableItems}
                            />
                        </DndProvider>
                    </Fragment>
                );
            }
        } else {
            return null;
        }
    }
}
