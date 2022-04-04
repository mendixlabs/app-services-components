# Drag and Drop Widget

> ⚠️ **Note**
>
> Mendix 9.6^ and up use version 3.xx of the widget
>
> Any other version see [here](https://mendixlabs.github.io/app-services-components/#/web-widgets/drag-and-drop-widget)

This is a complete rewrite of the Drag and Drop Widget.

This version supports most everything the old one did but also has keyboard interaction, touch screen interaction and a
more verbose class names to target.

This version also doesn't use custom javascript actions, but uses verbose microflows that any mendix developer can
understand and edit.

## How to use the Widget via examples

To show how to use the widget I will be using the examples in the test project. You can find the Example Project
[here]() and the Helpers [here]()

Get a ☕️ and lets go...

### Best Restaurants Example _(Example 1 in MPK file)_

#### Setup in Mendix

<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example1/exm1demo.gif" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            Example 1 Demo
        </tr>
    </table>
</td>
</tr>
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example1/ex1m.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            Example 1 On Page
        </tr>
    </table>
</td>
</tr>
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example1/ex1micro.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            Example 1 Microflow
        </tr>
    </table>
</td>
</tr>
</table>

-   STEP 0️⃣ - _Import the Example Module into your project_

    -   Import the Example Module
    -   Copy over the Folder called `Private` into the module you want to add dnd capabilities (This folder contains
        some helpful Microflows)
    -   Copy over from the Domain Model, in the Example Module, to your Module's Domain module the 2 non persistable
        Entities called `ActionMapping` and `JSONObject`. They are used by the Widget and microflows

    -   Create and Entity that is going to be the list. In our case its `Best_Restaurants`. evert draggabile entity must
        have values on
        -   `UUID` type of string
        -   `SortValue` type of interger

    **It is advised to auto generate the `uuid` and `sortvalues` on save, as the user creates the item, for demo
    purposes we just manually create them**

    <table style="width:100%">
        <tr>
            <td  style="width:50%">
                <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/communication.png" target="_blank" /></td>
            <td>
            <table style="width:100%">
                <tr>
                    Example of non persistable objects used for communication
                </tr>
            </table>
        </tr>
    </table>

    -   Download / Import this Widget **(Search: Drag and Drop)**

-   STEP 1️⃣ - _Set up JSON_

    -   Drag in a data view and connect it to the microflow called `DS_JSONObject`. This will make a JSON string
        available to the widget that is used to communicate back and forth with Mendix.

-   STEP 2️⃣ - _Set Up Widget_

### WIDGET SETTINGS

##### JSON

<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example1/json.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Name</th>
            <th>Desc.</th>
        </tr>
        <tr>
            <td>Widget JSON State</td>
            <td>JSON Action Mapping Attribute</td>
        </tr>
    </table>
</td>
  </tr>
</table>

##### Actions

<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example1/actions.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Name</th>
            <th>Desc.</th>
        </tr>
        <tr>
            <td>Dragged To New Parent</td>
            <td>Action for if widget is nested in another widget. This is the Microflow called (Not Used in the example)</td>
        </tr>
        <tr>
            <td>Dragged in Same Parent</td>
          <td>Action called when item in list is dragged and dropped.</td>
        </tr>
    </table>
</td>
  </tr>
</table>

##### Data

<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example1/data.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Name</th>
            <th>Desc.</th>
        </tr>
        <tr>
            <td>Unique Container Name</td>
            <td>Unique name for the Container that is used internally and also prefixed on class names</td>
        </tr>
        <tr>
            <td>Is Parent Container</td>
            <td>Is this the only Widget on the page or the Parent container? Then set `true`, If the widget is in another Drag and Drop Widget then set this to `false`  </td>
        </tr>
        <tr>
            <td>Data</td>
            <td>The datasource needed to display data</td>
        </tr>
        <tr>
            <td>Sort On</td>
            <td>Attribute so sort the list of data on</td>
        </tr>
        <tr>
            <td>Display As Column</td>
            <td>True will set Flex to Column (Vertical) || False will set flex to row (Horizontal) </td>
        </tr>
        <tr>
            <td>Unique Parent</td>
            <td>UUID of Parent Container (Can Leave empty if Widget is Parent)</td>
        </tr>
        <tr>
            <td>Unique Iteration</td>
            <td>UUID of Items - Used to identify the dragged item</td>
        </tr>
    </table>
</td>
  </tr>
</table>

##### A11y

<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example1/a11y.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Name</th>
            <th>Desc.</th>
        </tr>
        <tr>
            <td>Parent Title</td>
            <td>If set screen reader will read "Self Title In Parent Title"</td>
        </tr>
        <tr>
            <td>Self Title</td>
          <td>Human readable text screen reader will read</td>
        </tr>
    </table>
</td>
  </tr>
</table>

---

-   STEP 3️⃣ - _Set Up Microflow_

    > **Please Note**
    >
    > -   The microflows are written in a way to make it easy for a mendix developer to understand and edit. You are
    >     more than welcome to extract into sub flows, and optimize the microflows.
    >
    > -   The Sort value is always trying to be in sync, but cannot be relied on to display to end users. Its deemed and
    >     as a helper value that is used by the widget but not indented to be displayed to the user

    <details><summary>Simple Explanation</summary>

    In this example we are using a microflow called `ACT_Drag_Same_Parent_Non_Nested`. All the areas you need to change
    to correspond your data model hav been highlighted. Match them to the corresponding entity name in your project.

    </details>

    <details><summary>Detailed Explanation (cont. from Simple Explanation)</summary>
    <br/>

    Still in `ACT_Drag_Same_Parent_Non_Nested`. The Widget on drop creates a JSON String that looks something like this.

    ```ts
    const OnDropTypes = {
        index: number; //==> Is where in the list the item is dropped // Array Index
        draggedUUID: string; //==> UUID of The Item Dragged
        droppedOnUUID: string; //==> UUID of The Item Dropped On
        currentParentUUID: string;  //==> UUID of The Parent Dragged From
        droppedOnParentUUID: string; //==> UUID of The Parent Dropped On
    };
    ```

    In the microflow we use `ActionMapping` to map these values. Once mapped we can use them like any other value in a
    microflow.

    We then:

    -   Retrieve all the dragged items.
    -   From that use `draggedUUID` to find the dragged item.
    -   Sort the list.
    -   Find out if Item Index is `-1`. `-1` index means user dragged to the very bottom of list.
        -   If `Yes` - Then do some logic and reorder the whole list.
        -   If `No` - It then determines if the user dragged up or down.
            -   Then it will loop over the entire list and re-sort the list accordingly

</details>

-   Step 4️⃣ _Model Some Data_

    -   **Model some data:** Back to the page in Mendix. The widget has 2 areas where you can add Mendix building
        blocks.

        The first one is where you model out the how each iteration will look.

        The second one is where you model out what will be displayed when the list is empty.

-   Step 5️⃣ _Style Your View_

    -   This might be the most difficult part of the whole operation 😉.

    > **Keep In Mind**
    >
    > You cannot use `css` psudo class to style hover, as it seems inconsistent with the underlying library used, thus
    > the widget will automagically add classes that you can target for hover. Most other psudo classes like
    > `:focus-visible` works as expected - And you
    > [should](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) probably use it too.

    -   The principal of classnames in the widget :

        -   All classes have an opposite class (ike Newton's third law). I.E. - the class `dnd_draggable_not_hover` once
            hovered overed over will change to `dnd_draggable_hover`
        -   All classes have an generic and specific name I.E. -

            ```text
            <!-- Unique_Container is the Unique Container Name you gave in the setup at step 2️⃣ -->

                Unique_Container_dnd_draggable_container_not_dragging
                dnd_draggable_container_not_dragging
            ```

    Here is a full list of classnames the Widget exposes, but it might be easier to get to this step and just open your
    browser devtools and get a better idea of the HTML the widget creates in the DOM

    <details><summary>CSS Class List</summary>

    Assume every class name listed has a corresponding unique class name.

    ```scss
    .dnd_spacer
    .dnd_container
    .dnd_at_end_over
    .dnd_draggable_new
    .dnd_draggable_over
    .dnd_draggable_item
    .dnd_draggable_hover
    .dnd_at_end_not_over
    .dnd_container_inside
    .dnd_drag_preview_item
    .dnd_draggable_not_new
    .dnd_draggable_dragging
    .dnd_draggable_not_over
    .dnd_draggable_not_hover
    .dnd_draggable_with_spacer
    .dnd_draggable_not_dragging
    .dnd_drag_preview_container
    .dnd_draggable_without_spacer
    .dnd_draggable_container_dragging
    .dnd_draggable_container_droppable
    .dnd_draggable_container_not_dragging
    ```

    </details>

### Factory Line Example _(Example 2 in MPK file)_

<table style="width:100%">
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2demo.gif" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 Demo
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2page.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 on Page
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2db.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 in Domain Model
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2pm.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2  Parent Microflow (ACT_Drag_Same_Parent_Non_Nested_Example_2)
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2csp.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 Child Drag within itself Microflow (ACT_Drag_Child_Same_Child)
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2cdp.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 Child Drag within itself Microflow (ACT_Drag_Child_To_New_Child)
            </tr>
        </table>
    </tr>
</table>

For this example do everything listed in Example 1 as there is virtually no difference. The only differences are that we
set `Display As Column` to false in the Parent and we use a microflow called `ACT_Drag_Same_Parent_Non_Nested_Example_2`
this is the same microflow as in example one but made to use the factory entity.

The child widget is set up in similar way but uses `Dragged to New Parent` and `Dragged in Same Parent` Actions,
respectively called `ACT_Drag_Child_To_New_Child` and `ACT_Drag_Child_Same_Child`

#### Setup of Widget - As It is similar to example 1 here is a quick overview.

<details><summary>Parent Setup</summary>
<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2pa.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Parent Actions Settings</th>
        </tr>
        </tr>
    </table>
</tr>
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2pd.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Parent Data and UUID Settings</th>
        </tr>
        </tr>
    </table>
</tr>

</table>

</details>
<details><summary>Child Setup</summary>
<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2ca.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Parent Actions Settings</th>
        </tr>
        </tr>
    </table>
</tr>
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/example2/ex2cd.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Parent Data and UUID Settings</th>
        </tr>
        </tr>
    </table>
</tr>

</table>

</details>

### Nesting of the widget

The widget has been tested to work fine with one level of nesting. As `A1->*B` so B is nested in A. we have not tested
more nesting but theoretically it is possible, something like `A1->*B1->*C`

<details><summary>How drag to new Parent Mircroflow works</summary>

Taking a look at the Microflow called `ACT_Drag_Child_To_New_Child`

Again the widget passes an JSON string that resembles this structure:

```ts
    const OnDropTypes = {
        index: number; //==> Is where in the list the item is dropped // Normal Array Index
        draggedUUID: string; //==> UUID of The Item Dragged
        droppedOnUUID: string; //==> UUID of The Item Dropped On
        currentParentUUID: string;  //==> UUID of The Parent Dragged From
        droppedOnParentUUID: string; //==> UUID of The Parent Dropped On
    };
```

Again this is mapped with the import mapping and made available to be used in the microflow.

-   Retrieves Dragged Item.
-   Retrieves Parent Dragged From.
-   Retrieves Parent Dropped On.
-   Changes Dragged Item to New Parent and Commits.
-   Retrieves List of Items In Parent Dragged From.
-   Sorts List
-   Change Iteration on Items.
-   Retrieves List of Items In Parent Dropped On.
-   Sorts List
-   Find out if Item Index is `-1`. `-1` index means user dragged to bottom of list.
    -   `YES` - Counts list of Items and changes the `sortValue` to the total of Items in Parent Dropped On.
    -   `NO` - Then it will loop over the entire list and resort the list accordingly.
-   Commit All changes.

</details>

## CSS Deep Dive

<details><summary>How drag to new Parent works</summary>

## Styling

The widget exposes a lot of class names that you can target for custom styling

**Note:** Pseudo styling, like `:hover`, is not recommended and could lead to some issues.

The widget is wrapped with the class name given in `Unique Container Name` looking something like this:

```html
<!-- some cool HTML -->
<div class="TEXT_FROM_Unique_Container_Name">
    <Widget />
</div>
```

### Generic and Specific Styles

So all css is encapsulated, but if you wanted to write universal styles for 2 or more Widgets, the widget exposes
generic and specific class names: e.g.

```html
<!-- some cool HTML -->
<Widget>
    <div
        class="TEXT_FROM_Unique_Container_Name_dnd_draggable_item
        dnd_draggable_item"
    >
        Drag Me
    </div>
</Widget>
```

So for every class name there is a generic one and specific one prefixed with `Unique Container Name`

### Odd and Even Class Names

As the widget adds and removes class names for all interactions with it it gives odd and even class names.

If there is a class name `draggable` there is a `_not_draggable`. Below is the list of css names on a Draggable element
that is in rest:

```text
Unique_Container_Name_dnd_draggable_item
dnd_draggable_item

Unique_Container_Name__dnd_draggable_not_new // not recommended
dnd_draggable_not_new // not recommended

Unique_Container_Name__dnd_draggable_not_over
dnd_draggable_not_over

Unique_Container_Name__dnd_draggable_not_hover
dnd_draggable_not_hover

Unique_Container_Name__dnd_draggable_not_dragging
dnd_draggable_not_dragging
```

### Special Class names

There is a droppable area at bottom of the widget that takes up the height by its parent/ or the whole empty widget.
This is done for if you want a droppable region bigger that the list is long:

**NOTE** Use with caution as it will always return -1 index. So id you get -1 in you mendix microflow, know that that
dropped item must be added to the bottom of the list

```text
Unique_Container_dnd_draggable_container_droppable
dnd_draggable_container_droppable
```

At the bottom of every iteration in the list there is an empty `div` what can be styles as a spacer, this can be margin,
padding or height/width.

```text
Unique_Container_dnd_draggable_container_not_dragging
dnd_draggable_container_not_dragging

Unique_Container_dnd_draggable_container_dragging
dnd_draggable_container_dragging
```

### Drag Preview

Drag preview has most of the same classnames as the individual items rendered except it is nested a lithe different so
be cause's when it come to nesting/specificity.

-   Drag Preview Container

```text
Unique_Container_dnd_drag_preview_container
dnd_drag_preview_container
```

-   Drag Preview Item

```text
Unique_Container_dnd_draggable_item
dnd_draggable_item

Unique_Container_dnd_drag_preview_item
dnd_drag_preview_item
```

## Some oddities when nesting.

As nesting can cause oddities, and the functionality does depend on on the way you style it.

So lets see some practical examples

**Hover Event**

```scss
//  Mouse Hover Over Item
.dnd_draggable_hover {
    background-color: green;
}
```

<img src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/hover.gif'/>

```scss
//  Space Created Above on Drag Over
.isAbove {
    background-color: blue;
}
//  Space Created Below on Drag Over
.isBelow {
    background-color: red;
}
```

<img src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/above-below.gif'/>

**Dragging Event**

```scss
.dnd_draggable_dragging {
    background-color: brown;
}
```

<img src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/drag-and-drop-widgetassets/dragging.gif'/>

</detail>
