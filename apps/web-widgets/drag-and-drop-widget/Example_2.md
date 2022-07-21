## How to use the Widget via examples

### [Live Demo](https://dnd-lts-sandbox.mxapps.io/p/example_2?profile=Responsive)

To show how to use the widget I will be using the examples in the test project. You can find the Example Project
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/dnd_lts.mpk) or
if you only want the Helpers
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/DnD_HelpersModule.mpk)
and the Examples
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/DnD_Examples.mpk)

Get a ☕️ and lets go...

### Factory Line Example _(Example 2 in MPK file)_

<table style="width:100%">
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2demo.gif" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 Demo
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2page.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 on Page
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2db.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 in Domain Model
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2pm.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2  Parent Microflow (ACT_Drag_Same_Parent_Non_Nested_Example_2)
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2csp.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 2 Child Drag within itself Microflow (ACT_Drag_Child_Same_Child)
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2cdp.png" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2pa.png" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2pd.png" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2ca.png" target="_blank" /></td>
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
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example2/ex2cd.png" target="_blank" /></td>
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
