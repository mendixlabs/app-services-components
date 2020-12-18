import { Component, ReactNode, createElement } from "react";
import DragInit from "./components/DragInit";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { DraganddropwidgetContainerProps } from "../typings/DraganddropwidgetProps";
import { CompState, NewElementDraggedIn, ReorderAfterDropTypes } from "./components/types";

import { is_touch_device, backendOptions } from "./utils";

import "./ui/Draganddropwidget.css";

// const RNDContext = createDndContext(HTML5Backend);

export default class Draganddropwidget extends Component<DraganddropwidgetContainerProps, CompState> {
    constructor(props: DraganddropwidgetContainerProps) {
        super(props);
        this.state = { listOfSortableItems: [] };
    }

    componentDidUpdate(pP: DraganddropwidgetContainerProps) {
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
    setMendixData = () => {
        const orderList = this.props.incomingData.items?.reduce((a: any, c) => {
            return [...a, { id: c.id, item: c, uuid: this.props.uuid }];
        }, []);
        this.setState({
            listOfSortableItems: orderList
        });
    };

    reorderAfterDrop = ({ currentItem, index }: ReorderAfterDropTypes) => {
        const { listOfSortableItems } = this.state;
        const { uuid, dropDataAttr, onDropAction, onDifferentColumDrop, dataSourceName, content } = this.props;

        if (uuid !== currentItem.item.uuid) {
            // @ts-ignore
            const modelToSaveFrom = content && content(currentItem?.item?.item).props.object.jsonData.objectType;

            const settingsForSave: NewElementDraggedIn = {
                modelToSaveFrom,
                dataSourceName,
                whereToPut: index,
                item: currentItem,
                comingTo: uuid,
                comingFrom: currentItem.item.uuid
            };
            const listToMendix = listOfSortableItems;

            listToMendix.splice(index, 0, currentItem.item);

            const jsonString = JSON.stringify({ settingsForSave, listToMendix });

            dropDataAttr.setValue(jsonString);

            if (onDifferentColumDrop && onDifferentColumDrop.canExecute && !onDifferentColumDrop.isExecuting) {
                onDifferentColumDrop.execute();
            }
        } else {
            const movedItem = listOfSortableItems.find(item => item.id == currentItem.item.id);

            const removedItemList = listOfSortableItems.filter(item => item.id != currentItem.item.id);

            movedItem && removedItemList.splice(index, 0, movedItem);

            this.setState({ listOfSortableItems: removedItemList });

            const jsonString = JSON.stringify(removedItemList);

            dropDataAttr.setValue(jsonString);

            if (onDropAction && onDropAction.canExecute && !onDropAction.isExecuting) {
                onDropAction.execute();
            }
        }
    };

    render(): ReactNode {
        const { listOfSortableItems } = this.state;
        const { content, emptyData } = this.props;
        if (listOfSortableItems) {
            if (is_touch_device()) {
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
                    <DndProvider backend={HTML5Backend}>
                        <DragInit
                            content={content}
                            emptyData={emptyData}
                            reorderAfterDrop={this.reorderAfterDrop}
                            listOfSortableItems={listOfSortableItems}
                        />
                    </DndProvider>
                );
            }
        } else {
            return null;
        }
    }
}
