# Skip links | Skip Navigation | Skip to Content

An Implementation of Skip links for Mendix.

Skip links or Skip Navigation links are used to help assistive technologies skip long navigation and let its users get
to the page content quicker:

Read more about A11Y and Skip links [here](https://webaim.org/techniques/skipnav/)

If you don't see anything when "tabbing" through your Mendix app see [here](http://www.outlinenone.com/)

<table style="width:100%">
    <tr>
        <th>Before</th>
        <th>After</th>
    </tr>
  <tr>
    <td  >
    <img align="center" width="550" alt="headerIMG" src="./assets/Before.gif" target="_blank" />
    </td>
    <td>
    <img align="center" width="550" alt="headerIMG" src="./assets/After.gif" target="_blank" />
    
</td>
  </tr>
</table>

## Usage

The widget will work 99% of the time out of the box without any input from the developer as we target internal Mendix
class names, but should you need some customizability please continue.

The widget works best when added to your main layout page:

<img align="center" width="550" alt="headerIMG" src="./assets/ex1.png" target="_blank" />
<br/>
<br/>
The widget adds some HTML in the dom - This is known as the skip link itself. You are free the style this div and button
as you want by targeting `.skip_link`.

<table style="width:100%">
  <tr>
    <td  style="width:50%"><img align="center" width="550" alt="headerIMG" src="./assets/ex2.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Name</th>
            <th>Desc.</th>
        </tr>
        <tr>
            <td>Before/After</td>
            <td>Sets if the skip link div and button must be added before or After Button class</td>
        </tr>
        <tr>
            <td>Button Class</td>
            <td>The class name to target to add the skip div or button to. Defaults to `.navbar-brand`</td>
        </tr>
        <tr>
            <td>Main Content Class</td>
            <td>The class name to know where the Main part of the application is. Defaults to `.region-content`</td>
        </tr>
    </table>
</td>
  </tr>
</table>
