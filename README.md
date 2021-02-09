<h1 align="center">Collapsible Header on Scroll (Mendix Widget)</h1>

<p align="center">
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/badge/Status-Production-blue?style=for-the-badge" target="_blank" />
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
 <img  align="center" alt="headerIMG" src="./assets/ScrollHeader.png" target="_blank" />
  <br/>
  <br/>
  <h2 align="center">
    A Mendix Widget to collapse your Apps Header on Scroll
  </h2>
  <h5 align="center"> 
    You can choose to implement on every page (Template Level) or on a Per Page Level.
  </h5>
</p>
<br/>
<h3>Usage</h3>
<b>Usage on Every Page of App</b> - Add the Widget anywhere in the Layout your Pages are base on

<b>Individual Page</b> - Add the Widget anywhere on the page \*_Recommend top of page_

|                         | Type      | Info                                                                                                                                                                                                                                                                                                              |
| ----------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scroll Body Class Name  | `string`  | Class Name given to the main body of app that does not contain the header eg: `region-content` or `region-content-main`                                                                                                                                                                                           |
| Header Class Name       | `string`  | Class Name given to the header of app that does not contain the body eg: `region-topbar` or `region-header`                                                                                                                                                                                                       |
| Threshold               | `integer` | Number in pixels to scroll before triggering collapse of header                                                                                                                                                                                                                                                   |
| Expand On Threshold     | `boolean` | Should header expand immediately if user scrolls up (`false`) or should it wait till the threshold is reached (`true`)                                                                                                                                                                                            |
| Smart Compensator       | `boolean` | Because of the way Mendix handles scroll, the Widget tries and adds back the the Height you loose when the user scrolls. As this to non trivial it could fail, it is also dependent on the way you implement your "collapsing" so to compensate you can turn this on and off, if it is causing unforeseen issues. |
| Animation Speed (ms)    | `boolean` | This is the speed you set your animation to in ms, \*_This is not doing the animation_                                                                                                                                                                                                                            |
| React On Class Name     | `integer` | Non Styled Class Name you added to elements you want a class name to be added once the header collapses. This is used for identity                                                                                                                                                                                |
| React Class Name to Add | `string`  | Class Name that is added to `React On Class Name` once the header collapses and removed when expanded, you can here hid or show or style an element once the header is collapsed                                                                                                                                  |
