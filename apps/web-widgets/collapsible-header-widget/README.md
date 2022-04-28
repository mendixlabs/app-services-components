<h1 align="center">Collapsible Header on Scroll (Mendix Widget)</h1>

<p align="center">
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/badge/Status-Beta-blue?style=for-the-badge" target="_blank" />
  </a>
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/github/issues/ahwelgemoed/collapsible-header-widget?style=for-the-badge" target="_blank" />
  </a>
  <a href="">
    <img alt="GitHub issues" src="https://img.shields.io/github/release/ahwelgemoed/collapsible-header-widget?style=for-the-badge" target="_blank" />
  </a>
  <a href="https://appstore.home.mendix.com/link/modeler/">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Studio%20version-8.12%2B-blue.svg?style=for-the-badge" target="_blank" />
  </a>
  <a href="https://docs.mendix.com/developerportal/app-store/app-store-content-support">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg?style=for-the-badge" target="_blank" />
  </a>
  <a href="/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-Apache%202.0-orange.svg?style=for-the-badge" target="_blank" />
  </a>
  <br/>
</p>
<p align="center">
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/collapsible-header-widget/main/assets/ScrollHeader.png" target="_blank" />
  <br/>
  <br/>
  <h2 align="center">
    A Mendix Widget to collapse your Apps Header on Scroll
  </h2>
  <h5 align="center"> 
    You can choose to implement it on every page (Template Level) or on a Per Page Level.
  </h5>
</p>
<br/>
<h3>Examples</h3>
<p align="center">
     <img  align="center" alt="headerIMG" width="400" src="https://raw.githubusercontent.com/ahwelgemoed/collapsible-header-widget/main/assets/CardHide.gif" target="_blank" />
     <img  align="center" alt="headerIMG" width="400" src="https://raw.githubusercontent.com/ahwelgemoed/collapsible-header-widget/main/assets/ButtonMove.gif" target="_blank" />
</p>
<br/>
<h3>How it works</h3>
You as Mendix Developer have full control, all the widget does at a basic level
is add and remove class names. There are 2 types of class names a Hook- and a Edit- class name.

-   **Hook Class Names** : Are used to know where that element is in the dom.

    -   `Scroll Body Class Name` to know where the scroll part of the app is.
    -   `Header Class Name` is used to know where the fixed header is.
    -   `React On Class Name` is used to know where elements are to affect on scroll.

-   **Edit Class Name**: Is added or removed from its corresponding `Hook Class Name Element`.

    When the Scroll index is **greater** than the Threshold:

    -   `Collapse Header Class Name` is added to `Header Class Name`
    -   `React Class Name to Add` is added to `React On Class Name`

    When the Scroll index is **less** than the Threshold:

    -   `Collapse Header Class Name` is removed from `Header Class Name`
    -   `React Class Name to Add` is removed from `React On Class Name`

    You can then style the elements using scss nesting to be very specific. \*_Note_ If you do very fancy stuff your
    scss file has a chance of becoming messy

<h3>Usage</h3>
<b>Usage on Every Page of App</b> - Add the Widget anywhere in the Master Layout your Pages are base on

<b>Individual Page</b> - Add the Widget anywhere on the page \*_Recommend top of page_

<img align="center" width="550" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/collapsible-header-widget/main/assets/usage.png" target="_blank" />

|                            | Type      | Info                                                                                                                                                                                                                                                                                                              |
| -------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header Class Name          | `string`  | Class Name given to the header of app that does not contain the body eg: `region-topbar` or `region-header`                                                                                                                                                                                                       |
| Scroll Body Class Name     | `string`  | Class Name given to the main body of app that does not contain the header eg: `region-content` or `region-content-main`                                                                                                                                                                                           |
| Collapse Header Class Name | `string`  | Class Name given to the collapsed header                                                                                                                                                                                                                                                                          |
| Threshold                  | `integer` | Number in pixels to scroll before triggering collapse of header                                                                                                                                                                                                                                                   |
| Expand On Threshold        | `boolean` | Should header expand immediately if user scrolls up (`false`) or should it wait till the threshold is reached (`true`)                                                                                                                                                                                            |
| Smart Compensator          | `boolean` | Because of the way Mendix handles scroll, the Widget tries and adds back the the Height you loose when the user scrolls. As this to non trivial it could fail, it is also dependent on the way you implement your "collapsing" so to compensate you can turn this on and off, if it is causing unforeseen issues. |
| Animation Speed (ms)       | `boolean` | This is the speed you set your animation to in ms, \*_This is not doing the animation_                                                                                                                                                                                                                            |
| React On Class Name        | `integer` | Non Styled Class Name you added to elements you want a class name to be added once the header collapses. This is used for identity                                                                                                                                                                                |
| React Class Name to Add    | `string`  | Class Name that is added to `React On Class Name` once the header collapses and removed when expanded, you can here hid or show or style an element once the header is collapsed                                                                                                                                  |

<br/>
<h3>A 'Brief' Explanation of Smart Compensator </h3>

Mendix handles scroll in apps and because of this custom implementation we try to compensate for it.

Example:

If the Viewport is `1000px` and your header before scroll is `200px` the body will be `800px`. After the user scrolls
and hits the threshold you collapse your header to `150px`, the body size was calculated on page load and thus it is
still `800px` and now leaves you with 50px of whitespace at the bottom of the page.

The `smart compensator` calculates header size in expanded and in collapsed state, It then finds the difference between
those two values and adds that back to the body. So in the example above it will calculate a `50px` difference and then
add that to the body to make it `850px`. When the user scroll up and the header expands the smart compensator will
remove the `50px`.

The issue comes in because you will use animations the header is only in collapsed state after lets say `500ms` and thus
the smart compensator has to wait for the animation to finish before it can take the measurement and add it to the body.
Then if the user scrolls too quick to the end of the page before the smart compensator is done it can give strange
effects.

It is also recommended to use faster animations, recommended slowest of `1000ms` with the smart compensator on.

## Known Issues

Fast Scrolling causes Issue if Smart Compensator is on

## Issues || Track Features

Add issues to [project](https://github.com/ahwelgemoed/collapsible-header-widget/projects/1?add_cards_query=is%3Aopen)
board or open an GH [issue](https://github.com/ahwelgemoed/collapsible-header-widget/issues/new).
