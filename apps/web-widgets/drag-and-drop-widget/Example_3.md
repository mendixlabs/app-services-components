## How to use the Widget via examples

### [Live Demo](https://dnd-lts-sandbox.mxapps.io/p/example_3?profile=Responsive)

To show how to use the widget I will be using the examples in the test project. You can find the Example Project
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/dnd_lts.mpk) or
if you only want the Helpers
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/DnD_HelpersModule.mpk)
and the Examples
[here](https://github.com/mendixlabs/app-services-components/releases/download/draganddropwidget%403.0.2/DnD_Examples.mpk)

Get a ☕️ and lets go...

### Enum Example _(Example 3 in MPK file)_

<table style="width:100%">
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example3/ex3demo.gif" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 3 Demo
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example3/ex3page.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 3 on Page
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example3/ex3db.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 3 in Domain Model
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
            <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example3/ex3smc.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 3  Drag in Same Child (Re-Order)
            </tr>
        </table>
    </tr>
    <tr>
        <td  style="width:50%">
       <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example3/ex3dpc.png" target="_blank" /></td>
        <td>
        <table style="width:100%">
            <tr>
                Example 3 Drag from one widget to another (Change Enum)
                </tr>
        </table>
    </tr>
</table>

For this example do everything listed in Example 1 as there is virtually no difference. The only differences are that we
are dragging from one widget to another, so in this case we must add `Unique Container Name Accepts` property.

Widget 1 has a Unique Container Name of `PART_LIST_1` and widget 2 has a Unique Container Name of `PART_LIST_2`.

So in `PART_LIST_1`'s `Unique Container Name Accepts` we must add `PART_LIST_2` and in `PART_LIST_2` we must add
`PART_LIST_1` to its `Unique Container Name Accepts`. This wat Part list one knows it should accept drop form Part
List 2.

#### Setup of Widget - As It is similar to example 1 here is a quick overview.

<details open><summary>PART_LIST_1 Setup</summary>
<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example3/pl1s.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Data and UUID's</th>
        </tr>
        </tr>
    </table>
</tr>

</table>

</details>
<details open><summary>PART_LIST_2 Setup</summary>
<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/drag-and-drop-widget/assets/example3/pl2s.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Data and UUID's</th>
        </tr>
        </tr>
    </table>
</tr>

</table>

</details>

The microflows work similar to previous examples explicitly we are explicitly matching the items based on their `Emun`.
