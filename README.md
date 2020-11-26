[![Apache License](https://img.shields.io/badge/license-Apache%202.0-orange.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Build Status](https://travis-ci.org/JelteMX/mendix-tree-table.svg?branch=master)](https://travis-ci.org/JelteMX/mendix-tree-table)
[![Coverage Status](https://coveralls.io/repos/github/JelteMX/mendix-tree-table/badge.svg?branch=master)](https://coveralls.io/github/JelteMX/mendix-tree-table?branch=master)
[![Dependencies](https://david-dm.org/JelteMX/mendix-tree-table.svg)](https://david-dm.org/JelteMX/mendix-tree-table)
[![DevDependencies](https://david-dm.org/JelteMX/mendix-tree-table/dev-status.svg)](https://david-dm.org/JelteMX/mendix-tree-table?type=dev)
[![Support](https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg)](https://docs.mendix.com/developerportal/app-store/app-store-content-support)
[![Studio](https://img.shields.io/badge/Studio%20version-8.0%2B-blue.svg)](https://appstore.home.mendix.com/link/modeler/)
![GitHub release](https://img.shields.io/github/release/JelteMX/mendix-tree-table)
![GitHub issues](https://img.shields.io/github/issues/JelteMX/mendix-tree-table)
[![DeepScan grade](https://deepscan.io/api/teams/7221/projects/9345/branches/120491/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=7221&pid=9345&bid=120491)
[![Available](https://img.shields.io/badge/Test%20Project-available-green.svg)](https://github.com/JelteMX/widget-test-projects)

# Mendix Tree Table

Mendix Tree Table using [Ant Design Table](https://ant.design/components/table/) (MIT License).

![logo](/assets/AppStoreIcon.png)

Show a tree-like structure in Mendix.

![preview](/assets/preview.png)

> See test-project [https://reacttreeview-sandbox.mxapps.io/](https://reacttreeview-sandbox.mxapps.io/) for a live demo! This project is also used for all E2E tests. See at the bottom of this README a preview of the domain model. Test-project can be downloaded [here](https://github.com/JelteMX/widget-test-projects#tree-table)

## Features

- Display a tree structure in a table
- DataSource:
  - Root:
    - Xpath
    - Microflow
    - Nanoflow
  - Children:
    - Reference
    - Microflow
    - Nanoflow
- Row classes
- Row icons
- Select row/rows, execute on change/action button
- Dynamic columns
- Much more...

> This widget is only ~500Kb uncompressed, so in your cloud environment this would be about ~140Kb. This is light-weight for any project.

Tested:
- IE11
- Chrome,Firefox,Safari
- Should work on Mobile Web, but might not be very usable

## Basic configuration

### 1. Data
![Data](/assets/tab01-data.png)

- Select an Entity that will serve as your Node.
- You can choose whether to load the whole tree or partial (top level)
- Nodes can be retrieved through a few methods: Xpath, Microflow, Nanoflow
- Please note that this only loads the top-level data (first nodes)
- When you set this to XPath, define your constraint (if needed)
- Microflow & Nanoflow should return a list of Nodes

### 2. Children
![Children](/assets/tab02-children.png)

- You do not have to load children if you just want to load a flat list
- If you load children, it can be done in two ways:
  - Child reference: Your Node should have a self-reference, as a reference set (so a many-to-many relation). You define this reference, the widget will take care of checking if it has children or not and load them when opening the parent
  - Microflow/Nanoflow: Your Node should have an attribute that tells whether or not it has children. This can be accomplished during the creation of your nodes, or a calculated attribute. If the widget sees a node has a child it will load the children.

### 3. Helper
![Helper](/assets/tab03-helper.png)

- For doing clicks and selections, we need a Helper object. This will be created by the widget for an action and passed down to a microflow/nanoflow. This helper object has a reference to the context object (view) and a reference SET to the Node objects. When you execute a microflow/nanoflow, you will need to retrieve the node object itself over a reference.

### 4. Columns
![Columns](/assets/tab04-columns.png)

- Easiest way to configure columns is a list. This is a sorted list of all the attributes you want to show in the table. See **3.1 Columns List**
- If you want to do this dynamically (because your client wants to configure it), please look at **4. Columns**

#### 4.1. Column List
![Columns sub](/assets/tab04-columns-sub.png)

- A column should have a caption (shown at the top) and an attribute (to display the value)
- If you need to transform your value client-side, you can use a Transform Nanoflow. This should always return a string
- In the column UI tab you can set the width of the column (as '100', '25%' etc)
- You can also set a class name

### 5. Dynamic Columns

- Dynamic columns can be used to let the user define their column. This is a bit tricky though:
  - The attribute of the Node entity should be saved in the Attribute attribute of the column Entity (this is confusing, right 😜?).
- All other attributes should be straightforward.

Note:

In order to get the attributes of your Node entity in your project, I encourage you to use the [Model Reflection module in the AppStore](https://appstore.home.mendix.com/link/app/69/). This has the ability to load all entities and read their attributes. Then use this to create your Column entities.

### 6. Events
![Events](/assets/tab05-events.png)

- Events are pretty straightforward. The widget uses a debounce, which means it will not single click when you double-click.
- For the microflow/nanoflow, you will need to configure the helper object!

### 7. UI
![UI](/assets/tab06-ui.png)

- Header row (which contains the captions of the column) can be disabled
- You can set a class on the row through an attribute in your Node. This way it is possible to change colors (needs custom styling)
- Icons can be shown on the first column of the row. See test-project

### 8. Selection
![Selection](/assets/tab07-selection.png)

- Just like a normal table, you can use selection to do things with the Nodes.
- Configure buttons for a selection.
- The microflow/nanoflows use the Helper object
- Please note that when we use the Selection onChange, chances are that you will make a change to your context object (for example, set a selection reference/set). This would mean that the table re-renders, losing the selection. We circumvent this by temporarily lift the subscriptions (that will trigger when the context changes), execute the action, then reapply the subscriptions.

### 9. Misc
![Misc](/assets/tab08-misc.png)

- You can now save the state of your table. This only works for the whole tree, no partial trees!
- Experimentally expose `window.__TreeTable_{guid}_select`. This will accept a guid as string, or array of guids for multi selection

## Test-project

The [test-project](https://reacttreeview-sandbox.mxapps.io/) uses the following domain model. This is purely an example, but can be used as an inspiration to use in your own project:

![domain-model-example](/assets/domain-model-example.png)

Test-project can be downloaded [here](https://github.com/JelteMX/widget-test-projects#tree-table)

## Issues, suggestions and feature requests

Please report your issues [here](https://github.com/JelteMX/mendix-tree-table/issues)

## License

Apache 2
