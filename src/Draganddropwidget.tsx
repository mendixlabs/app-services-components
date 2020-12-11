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
        //@ts-ignore
        if (window.myManager != this.state.myManager) {
            this.setState({
                //@ts-ignore
                myManager: window.myManager
            });
        }
        if (this.props.incomingData.status === "available" && pP.incomingData.status !== "available") {
            console.log("this.props.incomingData", this.props);
            const orderList = this.props.incomingData.items?.reduce((a: any, c) => {
                console.log("this.props.data(c)", this.props.data(c));
                // TODO:: Make this so that the user specifies name of field
                return [
                    ...a,
                    { id: c.id, orderValue: this.props.data(c).displayValue, item: c, uuid: this.props.uuid }
                ];
            }, []);
            this.setState({
                listOfSortableItems: orderList
            });
        }
    }
    reorderAfterDrop = async ({ currentItem, index }: any) => {
        const { listOfSortableItems } = this.state;
        const { uuid, dropDataAttr, onDropAction } = this.props;

        console.log(uuid, "🔥currentItem", currentItem);
        if (uuid !== currentItem.item.uuid) {
            console.log(uuid, "🔥currentItem", currentItem);
        } else {
            // @ts-ignore
            const movedItem = listOfSortableItems.find(item => item.id == currentItem.item.id);
            // @ts-ignore
            const removedItemList = listOfSortableItems.filter(item => item.id != currentItem.item.id);
            // @ts-ignore
            await removedItemList.splice(index, 0, movedItem);
            await this.setState({ listOfSortableItems: removedItemList });
            const jsonString = await JSON.stringify(removedItemList);
            console.log("removedItemList", removedItemList);
            await dropDataAttr.setValue(jsonString);
            await dropDataAttr.setTextValue(jsonString);

            if (onDropAction && onDropAction.canExecute && !onDropAction.isExecuting) {
                onDropAction.execute();
            }
        }
    };

    render(): ReactNode {
        const { listOfSortableItems, myManager } = this.state;
        // // console.log("listOfSortableItems", listOfSortableItems);
        //@ts-ignore
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
