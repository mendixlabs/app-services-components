[![Apache License](https://img.shields.io/badge/license-Apache%202.0-orange.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Build Status](https://travis-ci.org/JelteMX/mendix-tree-view.svg?branch=master)](https://travis-ci.org/JelteMX/mendix-tree-view)
[![Coverage Status](https://coveralls.io/repos/github/JelteMX/mendix-tree-view/badge.svg?branch=master)](https://coveralls.io/github/JelteMX/mendix-tree-view?branch=master)
[![Dependencies](https://david-dm.org/JelteMX/mendix-tree-view.svg)]([https://david-dm.org/JelteMX/mendix-tree-view](https://david-dm.org/JelteMX/mendix-tree-view))
[![DevDependencies](https://david-dm.org/JelteMX/mendix-tree-view/dev-status.svg)]([https://david-dm.org/JelteMX/mendix-tree-view?type=dev](https://david-dm.org/JelteMX/mendix-tree-view?type=dev))
[![Support](https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg)](https://docs.mendix.com/developerportal/app-store/app-store-content-support)
![WM](https://img.shields.io/badge/Webmodeler%20compatible-NO-red.svg)
[![Studio](https://img.shields.io/badge/Studio%20version-8.0%2B-blue.svg)](https://appstore.home.mendix.com/link/modeler/)
[![GitHub release](https://img.shields.io/github/release/JelteMX/mendix-tree-view)](https://github.com/JelteMX/mendix-tree-view/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/JelteMX/mendix-tree-view)](https://github.com/JelteMX/mendix-tree-view/issues)

# Tree View for Mendix

Mendix Tree View widget using [Ant Design Table](https://ant.design/components/table/) (MIT License).

![logo](/assets/AppStoreIcon.png)

Show a Tree structure in your Mendix project

![screenshot](/assets/screenshot.png)

> See test-project [https://treeview-react-sandbox.mxapps.io/](https://treeview-react-sandbox.mxapps.io/) for a live demo! The test-project itself can be downloaded [here](https://github.com/JelteMX/widget-test-projects#tree-view)

> Missing features? See TODO at the bottom to see which items are still on the TODO list. If you find other bugs, please report this as an issue [here](https://github.com/JelteMX/mendix-tree-table/issues)

## Features

- Display a tree structure in a tree view
- Data Sources: XPath, Microflow, Nanoflow
- Load a complete tree structure
- Two patterns: Node-Parent or Node-Children
- Load children over reference, xpath or nanoflow
- On Click events
- Drag &amp; Drop (Node-Parent)
- **Experimental** Client side search (Only on loading a complete tree)

> This widget is about 300Kb uncompressed, so in your cloud deployment this widget should take about 83 Kb of network resources

Tested:

- IE11 & Edge
- Chrome
- Firefox
- Safari

## Basic Configuration

### 1. Data Source

![settings](/assets/settings1.png)

### 2. Data

![settings](/assets/settings2.png)

- You can choose to load a complete tree, or partial
- The rest of the settings are self-explanatory

### 3. Relation

![settings](/assets/settings3.png)


### 4. UI

![settings](/assets/settings4.png)

### 5. Drag & Drop

![settings](/assets/settings5.png)

- Drag &amp; Drop is only enabled for objects with a parent relation
- The widget will do the changes on the object by itself

### 6. Experimental - Search

![settings](/assets/settings6.png)

- This feature is highly experimental and might be subject to change in future releases
- It requires another helper entity, which will be used in calling a Nanoflow
- The helper entity has a reference set of all the objects that are loaded, and the search query. It is up to you to create a Nanoflow that returns a list of objects to be shown (act as a filter)

### 7. Events

![settings](/assets/settings7.png)

## Demo project

[https://treeview-react-sandbox.mxapps.io/](https://treeview-react-sandbox.mxapps.io/)

### Domain model

![domain](/assets/domain.png)

- This is an example of the domain model used in our test-project
- **Note: Only use one type of relation! Either Node-Parent or Node-Children!** This domain model features both, as cwe reate two types of sets of nodes to show all capabilities

## Issues, suggestions and feature requests

Please report your issues [here](https://github.com/JelteMX/mendix-tree-view/issues)

## Development and contribution
[specify contribute]

## TODO

These are action items on the list for future releases

- WebModeler preview
- Draggable NodeChildren
- On DragChange mf/nf
- Selectable? Version 2.0
- Automated unit tests & CI/CD pipeline

## License

Apache 2
