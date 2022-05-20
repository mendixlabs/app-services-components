<h1>Screen Shot | Print Screen</h1>

<img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/screen-shot-mx/assets/header.png" target="_blank" />

<p align="center">

<a href="https://docs.mendix.com/community/app-store/app-store-content-support">
  <img align="center" alt="Mendix Support Community" src="https://img.shields.io/badge/Mendix%20Support%3A-Community-%23ED8B00.svg?style=for-the-badge&logoColor=#23ED8B00">
</a>
<a href="https://marketplace.mendix.com/link/studiopro/">
  <img align="center" alt="Mendix Version 9 and up" src="https://img.shields.io/badge/Mendix%20Version%3A-9.xx-%23007ACC.svg?style=for-the-badge&logoColor=#23ED8B00">
</a>

</p>

An Implementation to make a screenshot in the front end and generate a PDF from it. Compatible with Mendix 9.xx and up.

In it essence it is primitive, but does support Multi Pages and is [Dojo](https://dojotoolkit.org/) free so should be
compatible _relatively_ well into newer Mendix versions.

As this is using the front end to generate the PDF, unforeseen changes in user device can affect the end result, this is
a problem in any product that tries to generate from the users device.

A general use case is to model out what you want to be printed in a pop up/modal, and controll width and height by hard
coding it.

> Usage of this is recommended for _POC's_ or _QR_ printing. ([Quick Sprint Task](https://xkcd.com/1425/))
>
> **Note** Printing important docs from the front end also ads a security risk, as users can easily change values in the
> browser.

## Setup in Studio Pro

Download and Import the widget, Add a button into the placeholder section and style it to match your designs, do not
give the button any action as the widget will take control of the Click action.

<table style="width:100%">
  <tr>
    <td  style="width:50%">
    <img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/screen-shot-mx/assets/screenshot.png" target="_blank" /></td>
    <td>
    <table style="width:100%">
        <tr>
            <th>Name</th>
            <th>Desc.</th>
        </tr>
        <tr>
            <td>Class Name To Print</td>
            <td>Class Name to target to print</td>
        </tr>
        <tr>
            <td>Prefix for Page Name</td>
            <td>Prefix to add to default file name once saved</td>
        </tr>
        <tr>
            <td>Page Orientation</td>
            <td>Choose to print in Landscape or Portrait Orientation </td>
        </tr>
        <tr>
            <td>Page Size</td>
            <td>Choose a Page Size, Options A4, A5, A6 and US Letter</td>
        </tr>
    </table>
</td>
  </tr>
</table>

## End result

A moving Picture is worth a 1001 words

<img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/screen-shot-mx/assets/screenshot_demo.gif" target="_blank" />

### Issues / Limitations

There are currently no know limitations. but if you find some feel free to add a Github issue here.
