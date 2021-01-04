## Drag and Drop Widget

## Usage

| Object list group     | List         | List of items to Show cards for                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UUID/Status           | `string`     | If the attribute you are filtering on is an ENUM and all the data is coming from the same Data source (i.e same Entity in the domain model) use the same Enum here to give the widget context of what it is displaying. If how ever you are dragging and dropping between 2 different Data sources (Different Entities with data similar structures), this field must be an unique id. In either case this field will be unique to for every instance of the widgets you have. |
| Data Source Name      | `string`     | Text Name of the Data Source ??\*\* Check if this is Still used.                                                                                                                                                                                                                                                                                                                                                                                                               |
| In Coming Data        | `datasource` | Specify the Data to display, usually a Micro- or Nano- Flow where the Mendix Dev Limits and sorts the Incoming data.                                                                                                                                                                                                                                                                                                                                                           |
| Non Persistable Data  | `datasource` | The non persistable data entity you wrap all your widgets in. This is used as state in the widget                                                                                                                                                                                                                                                                                                                                                                              |
| Same Column Drop      | `action`     | Microflow to trigger if data comes in from the same column                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Different Column Drop | `action`     | Microflow to trigger if data comes in from different column                                                                                                                                                                                                                                                                                                                                                                                                                    |

## Column Drop Actions

We provide some pre-created actions that you should implement and configure.

**TO-DO** :: Show where to download it :: **TO-DO**

### Same Column Drop

-   Same Datasource _(Same Entity)_

    -   After importing the Commons File Find the Folder called `nanoflows` in the `draganddrop` folder. Use the
        nanoflow called `Same_Col_Drop_NF`. Copy it into your project and start setting it up.

            -   Configure the incoming data to be that of your non-persistable data source you wrapped the widget in.

            -   Configure the 3 Strings:

                -   `nonPersitabileModelName` - Model name of the Non Persistable Model (i.e:
                    `DragAndDropWidget.SimpleListState`)

                -   `nonPersistableAttName` - Attribute name of the Non Persistable Model (i.e: `json`)

                -   `persitableOrderAtt` - Attribute name used to 'sort' the Persistable Model (i.e: `Order`)

    -   Then copy over the Javascript Action in the folder `Javascript_Actions` called `Same_Col_Drop_JS` and configure
        the nanoflow to use it.

    This action does some cool stuff: It parses the Json coming in from the React Widget, Loops offer the array of
    mxObjects then fetched that object on very iteration Updates the order attribute and then commits this.

    The React Widget handles the sorting after the Mendix dev sets it once. All objects in that list will have new
    updated order values, after the initial drop. Thus what ever is selected as the 'order' value, must not be unique.
    The order is also seen as irrelevant to the end user and should never be displayed to them. It has been build in
    such a way that the React State and MEndix state should never run out of sync with each other, and seems robust.

### Different Column Drop

Is called by THAT widget when another widget drops an Object into it.

-   Same Datasource _(Same Entity)_

    -   After importing the Commons File Find the Folder called `nanoflows` in the `draganddrop` folder. Use the
        nanoflow called `Same_Col_Drop_NF`. Copy it into your project and start setting it up.

            -   Configure the incoming data to be that of your non-persistable data source you wrapped the widget in.

            -   Configure the 3 Strings:

                -   `nonPersitabileModelName` - Model name of the Non Persistable Model (i.e:
                    `DragAndDropWidget.SimpleListState`)

                -   `nonPersistableAttName` - Attribute name of the Non Persistable Model (i.e: `json`)

                -   `persitableOrderAtt` - Attribute name used to 'sort' the Persistable Model (i.e: `Order`)

    -   Then copy over the Javascript Action in the folder `Javascript_Actions` called `Same_Col_Drop_JS` and configure
        the nanoflow to use it.

    This action does some cool stuff: It parses the Json coming in from the React Widget, Loops offer the array of
    mxObjects then fetched that object on very iteration Updates the order attribute and then commits this.

-   Different Datasource _(Different Entity)_
