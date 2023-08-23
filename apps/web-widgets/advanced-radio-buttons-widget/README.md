## Advanced Radio Buttons
This widget is a mirror of default Mendix radio buttons widget with some additional features.

## Features
**What you get:**
* Orientation (Horizontal, Vertical)
* Data source: boolean or enumeration attribute
* Label same as default also with aria-labeled attribute
* Editability
  * "Editable" enumeration as in default widget
  * Read-only style (Control,Text)
* Visibility - fully mirrored
* Accessibility: Aria required boolean
* Default "Common" tab
* Events: On Change event
* Same classes and styles that default widget has
* Possibility to add custom style and classes to widget via default "Appearance" tab
* Design mode preview is almost the same
* Structure mode preview is very similar, but with slight differences in layout
* Icon and tile for both dark and not-dark modes

**What is not available** (mostly because of custom widgets limitations):
* Widget id structurally differs from how default radio-button id looks like 
* Read-only style does not have "Based on data view" option
* Validation "Type" dropdown is missing
* No "On enter" and "On change" events (They are useless in radio-buttons)
* Preview in both Structure and Design modes always will show two pre-defined radio-button options
  * [Option 1]
  * [Option 2] ...

**New features:**
* Possibility to change captions for each selection option
* Possibility to remove options from radio-buttons

## Usage
Same as with default radio-buttons widget 
1. Pull the widget to the page
2. Select attribute

Using custom labels for options:
1. In Label tab select "Use custom option labels"
2. In "Custom option labels" list create new line for each option that you want to have custom label
    * "Key to identify old label" should contain key name of one enumeration option.
    * In case of boolean it should be either _true_ or _false_
    * If you want you can remove undesirable selection options
      * Select "Remove missing options"
      * All options that were not specified in "Custom option labels" section will not show

## Issues, suggestions and feature requests
https://github.com/3loader/mx-advanced-radio-buttons/issues

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`. 
2. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

