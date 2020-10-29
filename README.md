<h1 align="center">App Guide For Mendix</h1>

<p align="center">
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/github/issues/ahwelgemoed/app-guide-mendix-widget" target="_blank" />
  </a>
  <a href="">
    <img alt="GitHub issues" src="https://img.shields.io/github/release/ahwelgemoed/app-guide-mendix-widget" target="_blank" />
  </a>
  <a href="https://appstore.home.mendix.com/link/modeler/">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Studio%20version-8.0%2B-blue.svg" target="_blank" />
  </a>
  <a href="https://docs.mendix.com/developerportal/app-store/app-store-content-support">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg" target="_blank" />
  </a>
  <a href="/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-Apache%202.0-orange.svg" target="_blank" />
  </a>
  <br>
  
</p>

![datasource](./assets/AppGuide.png)

### A Widget to Showcase new Features in your App, or created Guided tour in your app.

The basic idea is that you add a unique class name to a element (div, h1, ect.) and then add that class name to the
widget, you give it a title and a description and that will create a guided introduction to your app. This will take the
user on a step by step journey through the App

## Features

-   Highlight Important information or key aspect is Complex Apps.

-   As the value is stored in the Data Model, this can be dynamically turned on or off based on actions in your app.

## Reasons to Use

Currently there is another Widget available ([Guided Tour](https://appstore.home.mendix.com/link/app/115336/)) it uses
the same underling React Lib, the difference between this Widget and that is as follows:

|                                | App Guide | Guided Tour                       |
| ------------------------------ | --------- | --------------------------------- |
| Attribute Stored in Data Model | ✅        | ❌ _(Uses Local Browser Storage)_ |
| Solves Scroll Bug \*           | ✅        | ❌                                |
| Works Across Pages             | ✅        | ❌                                |

This widget also solves a Race condition when Mendix app is loading and the Widget is initializing.

_\* As most Mendix apps use a fixed window hight and scrolls a containing div, this causes issues when the desired
highlighted point is not in the Viewport on page load._

## Usage

There are Various Options Available with some caveat's:

|                        | Type    | Desc                                                                                                                                                                                                                                                         |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Welcome attribute      | Boolean | Attribute from the data model to either Show or hide app guide. _Recommended Naming Convention_ `hasSeen_xxx` as false will SHOW the Widget and true will HIDE it                                                                                            |
| On Complete            | Action  | Usually a Microflow to change the Welcome Attribute, is shows that the user has completed the App Guide. Changes the Welcome attribute from truthy to falsy. Can also be a Page Call, as you can implement the guide on multiple pages and "connect" them to |
| On Complete Page Call? | Boolean | If the guide is Navigating to a different page, this must be set to True.                                                                                                                                                                                    |
| Show Skip Button       | Boolean | Show the skip button in the floating card                                                                                                                                                                                                                    |
| Show Progress          | Boolean | Show the progress in the floating card                                                                                                                                                                                                                       |
|                        |         |                                                                                                                                                                                                                                                              |

| Object list group | List         | List of items to Show cards for                                                                                  |
| ----------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| Classname         | String       | The class name to attache it self to. This must be unique per Item                                               |
| Title             | String       | Title of the Card                                                                                                |
| Content           | Multi-String | Description of Card                                                                                              |
| Position          | Multi-String | Position of the floating card. It will try its best but will break away if it cant fit the card in the view port |
|                   |              |                                                                                                                  |
|                   |              |                                                                                                                  |

### Screen Shots

![datasource](./assets/SS1.png)

![datasource](./assets/SS2.png)

![datasource](./assets/SS3.png)

-   Hex values to change card settings

## Known Issues

-   None

## Issues, suggestions and feature requests

[Github Issues](https://github.com/ahwelgemoed/app-guide-mendix-widget/issues "Github Issues")

## License

Apache 2
