import { Component, ReactNode, createElement } from "react";
import DragInit from "./components/DragInit";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { HelloWorldSample } from "./components/HelloWorldSample";
// import update from "immutability-helper";

import { DraganddropwidgetContainerProps } from "../typings/DraganddropwidgetProps";

import "./ui/Draganddropwidget.css";

export default class Draganddropwidget extends Component<DraganddropwidgetContainerProps> {
    state = { myManager: null, listOfSortableItems: [] };
    componentDidUpdate(pP: any) {
        const { listOfSortableItems } = this.state;
        //@ts-ignore

        //@ts-ignore
        if (window.myManager != this.state.myManager) {
            this.setState({
                //@ts-ignore
                myManager: window.myManager
            });
        }

        if (
            (this.props.incomingData.items && this.props.incomingData.items?.length !== listOfSortableItems.length) ||
            this.props.incomingData.items?.length !== pP.incomingData.items?.length
        ) {
            this.setMendixData();
        }
        if (this.props.incomingData.status === "available" && pP.incomingData.status === "loading") {
            this.setMendixData();
        }
    }
    setMendixData = () => {
        const orderList = this.props.incomingData.items?.reduce((a: any, c) => {
            //@ts-ignore
            // TODO:: Make this so that the user specifies name of field
            return [...a, { id: c.id, orderValue: this.props.data(c).displayValue, item: c, uuid: this.props.uuid }];
        }, []);
        this.setState({
            listOfSortableItems: orderList
        });
    };
    reorderAfterDrop = async ({ currentItem, index }: any) => {
        const { listOfSortableItems } = this.state;
        const { uuid, dropDataAttr, onDropAction, onDifferentColumDrop } = this.props;
        // @ts-ignore
        if (uuid !== currentItem.item.uuid) {
            /**
             * /TODO::Make a Check to see If This UUID can accept THAT UUID
             */

            // @ts-ignore
            const modelToSaveFrom = this.props.content(currentItem.item.item).props.object.jsonData.objectType;
            const settingsForSave = {
                modelToSaveFrom,
                whereToPut: index,
                item: currentItem
            };
            const listToMendix = listOfSortableItems;
            // @ts-ignore
            await listToMendix.splice(index, 0, currentItem.item);
            const jsonString = await JSON.stringify({ settingsForSave, listToMendix });
            await dropDataAttr.setValue(jsonString);

            if (onDifferentColumDrop && onDifferentColumDrop.canExecute && !onDifferentColumDrop.isExecuting) {
                onDifferentColumDrop.execute();
            }
        } else {
            // @ts-ignore
            // @ts-ignore
            const movedItem = listOfSortableItems.find(item => item.id == currentItem.item.id);
            // @ts-ignore
            const removedItemList = listOfSortableItems.filter(item => item.id != currentItem.item.id);
            // @ts-ignore
            await removedItemList.splice(index, 0, movedItem);
            await this.setState({ listOfSortableItems: removedItemList });
            const jsonString = await JSON.stringify(removedItemList);
            await dropDataAttr.setValue(jsonString);
            await dropDataAttr.setTextValue(jsonString);

            if (onDropAction && onDropAction.canExecute && !onDropAction.isExecuting) {
                onDropAction.execute();
            }
        }
    };

    render(): ReactNode {
        const { listOfSortableItems, myManager } = this.state;
        //@ts-ignore
        console.log("RENERER uuid", this.props.uuid, this.props.incomingData.items?.length);
        if (listOfSortableItems.length && myManager) {
            return (
                // @ts-ignore
                <DndProvider manager={this.state.myManager.current.dragDropManager}>
                    <DragInit
                        uuid={this.props.uuid}
                        content={this.props.content}
                        reorderAfterDrop={this.reorderAfterDrop}
                        listOfSortableItems={listOfSortableItems}
                    />
                </DndProvider>
            );
        } else {
            return <HelloWorldSample sampleText={"World"} />;
        }
    }
}
