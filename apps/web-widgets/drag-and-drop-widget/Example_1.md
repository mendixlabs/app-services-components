# Example 1

### [Live Demo](https://dnd-lts-sandbox.mxapps.io/p/example_1?profile=Responsive)

To show how to use the widget I will be using the examples in the test project. You can find the Example Project
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/dnd_lts.mpk) or
if you only want the Helpers
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/DnD_HelpersModule.mpk)
and the Examples
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/DnD_Examples.mpk)

Get a ☕️ and lets go...

### Best Restaurants Example _(Example 1 in MPK file)_

#### Setup in Mendix

<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example1/exm1demo.gif" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example1/ex1m.png" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example1/ex1micro.png" target="_blank" /></td>
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
                <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/communication.png" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example1/json.png" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example1/actions.png" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="./assets/example1/data.png" target="_blank" /></td>
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
        <tr>
            <td>Unique Container Name Accepts</td>
            <td>A list of `Unique Container Names` that can be added to allow to drag to completely different instances of the widget, not used here, but is used in Example 3 </td>
        </tr>
    </table>
</td>
  </tr>
</table>

##### A11y

<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example1/a11y.png" target="_blank" /></td>
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
