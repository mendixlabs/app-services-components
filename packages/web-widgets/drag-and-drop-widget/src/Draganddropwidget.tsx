import { Component, ReactNode, createElement, Fragment } from "react";
import DragInit from "./components/DragInit";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { attribute, equals, literal } from "mendix/filters/builders";

import { DraganddropwidgetContainerProps } from "../typings/DraganddropwidgetProps";

import { CompState, NewElementDraggedIn, ReorderAfterDropTypes } from "./components/types";

import { isTouchDevice, backendOptions } from "./utils";

import { greaterOrEqualToMendixVersion } from "@app-services-components/mendixhelpers";

import "./ui/Draganddropwidget.css";

// const RNDContext = createDndContext(HTML5Backend);

export default class Draganddropwidget extends Component<DraganddropwidgetContainerProps, CompState> {
    constructor(props: DraganddropwidgetContainerProps) {
        super(props);
        this.state = { listOfSortableItems: [] };
    }
    componentDidMount() {
        //   To Do - Add option for User to do Auto filter
        const isGreaterThan93 = greaterOrEqualToMendixVersion({
            minVersion: "9.3"
        });
        console.log(`isGreaterThan93`, isGreaterThan93);
        // Auto Sorts List
        if (this.props.sortOn.sortable) {
            this.props.incomingData.setSortOrder([[this.props.sortOn.id, "asc"]]);
        }
        // Auto Filter List
        if (this.props.filterOn.filterable) {
            if (this.props.filterOn.universe?.includes(this.props.uuid)) {
                const filterCond = equals(attribute(this.props.filterOn.id), literal(this.props.uuid));
                this.props.incomingData.setFilter(filterCond);
            } else {
                console.log("UUID NOT ENUM");
            }
        } else {
            console.log("Attribute is not filterable");
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
            listToMendix.splice(index, 0, currentItem.item);
            const jsonString = JSON.stringify({ settingsForSave, listToMendix });
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
