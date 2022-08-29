<h1 align="center">App Guide For Mendix</h1>

 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/app-guide-mendix-widget/assets/AppGuide.png" target="_blank" />
<br/>
<br/>
 <img  align="center" alt="demo" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/app-guide-mendix-widget/assets/demo.gif" target="_blank" />
<br/>
<br/>

### A Widget to Showcase new Features in your App, or created a Guided tour in your app.

The basic idea is that you add a unique class name to an element (div, h1, etc.) and then add that class name to the
widget, you give it a title and a description and that will create a guided introduction to your app. This will take the
user on a step by step journey through the App.

## Features

-   Highlight Important information or key aspect is Complex Apps.

-   As the value is stored in the Data Model, this can be dynamically turned on or off based on actions in your app.

## Reasons to Use

Currently there is another Widget available ([Guided Tour](https://appstore.home.mendix.com/link/app/115336/)) it uses
the same underlying React Lib, the difference between this Widget and that is as follows:

|                                | App Guide | Guided Tour                       |
| ------------------------------ | --------- | --------------------------------- |
| Attribute Stored in Data Model | ✅        | ❌ _(Uses Local Browser Storage)_ |
| Solves Scroll Bug \*           | ✅        | ❌                                |
| Works Across Pages             | ✅        | ❌                                |

This widget also solves a Race condition when Mendix app is loading and the Widget is initializing.

_\* As most Mendix apps use a fixed window height and scrolls a containing div, this causes issues when the desired
highlighted point is not in the Viewport on page load._

## Usage

There are Various Options Available with some caveat's:

|                        | Type    | Desc                                                                                                                                                                                                                                                         |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Has Seen               | Boolean | Attribute from the data model to either Show or hide app guide. _Recommended Naming Convention_ `hasSeen_xxx` as false will SHOW the Widget and true will HIDE it                                                                                            |
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

![datasource](https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/app-guide-mendix-widget/assets/SS1.png)

![datasource](https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/app-guide-mendix-widget/assets/SS2.png)

![datasource](https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/web-widgets/app-guide-mendix-widget/assets/SS3.png)

-   Hex values to change card settings

## Known Issues

-   None

## Issues, suggestions and feature requests

[Github Issues](https://github.com/ahwelgemoed/app-guide-mendix-widget/issues "Github Issues")

## License

Apache 2
