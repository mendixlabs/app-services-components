<p align="center">
    <img align="center" alt="headerIMG" src="./assets/CollapsibleHeaderGH.png" target="_blank" />
    <br>
    <br>
   A Collapsible Header for Mendix Native
    <br>
    <br>
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/badge/Status-Production-blue" target="_blank" />
  </a>
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/github/issues/ahwelgemoed/collapsible-native-header-widget" target="_blank" />
  </a>
  <a href="">
    <img alt="GitHub issues" src="https://img.shields.io/github/release/ahwelgemoed/collapsible-native-header-widget" target="_blank" />
  </a>
  <a href="https://appstore.home.mendix.com/link/modeler/">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Studio%20version-8.12%2B-blue.svg" target="_blank" />
  </a>
  <a href="https://docs.mendix.com/developerportal/app-store/app-store-content-support">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg" target="_blank" />
  </a>
  <a href="/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-Apache%202.0-orange.svg" target="_blank" />
  </a>
  <br>

</p>
<p >
<h3>Introduction</h3>

This widget was developed to follow a very specific Design Pattern, and was made for apps that use the Mendix Design
System.

The header follows a "2 Row to 1 Row" principal. When the header is expanded there are 2 Rows. The first row with
Actions , eg. System Back Button if available and Developer Defined Actions Buttons (max 2), the second row is the Page
Title. On Scroll the header will collapses based on the scroll index of the ScrollView. This will trigger the Title to
scale down and move on the x and y axis. The header will now be inline with the Action buttons, thus taking it from a 2
Row to a 1 Row.

Like any Native Widget this comes with some limitations and some Issues. Click here to see

<h3>Data</h3>
<p>
<img height='400'  alt="headerIMG" src="./assets/ds1.png" target="_blank" />
</p>

| Name          | Type        | Desc.                                                                                                                         |
| ------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Min height    | `attribute` | Minimum height. This is default set to 90, but can be overridden by setting it here OR using the native-styles in your theme. |  |
| Max height    | `attribute` | Maximum height. This is default set to 140, but can be overridden by setting it here OR using the native-styles in your theme |  |
| Padding Sides | `attribute` | Padding on the Left and right side of the Header                                                                              |  |

<p >
<h3>Usage</h3>
 <img height='400'  alt="headerIMG" src="./assets/ss1.png" target="_blank" />
 <img height='400'  alt="headerIMG" src="./assets/ss2.png" target="_blank" />
</p>
Add this code to your natives Styles

```js
export const mendix_collapsibleheader_CollapsibleHeader = {
    header: {
        backgroundColor: "#0A1325F0",
        minHeight: 90, // Min height
        maxHeight: 140 // Max Height
    }
};
```

## Issues || Track Features

-   Long Titles break overflow

Add issues to [project](https://github.com/ahwelgemoed/radio-buttons-native-widget/projects/1?add_cards_query=is%3Aopen)
board or open an GH [issue](https://github.com/ahwelgemoed/radio-buttons-native-widget/issues/new).
