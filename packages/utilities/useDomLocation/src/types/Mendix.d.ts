// /* tslint-disable */
// /* eslint-disable */
// // Note: This is a straight up copy from mendix-client (npm i mendix-client), with some additions for the contentform

// // Type definitions for Mendix client
// // Project: https://www.mendix.com/
// // Definitions by: Andries Smit <https://github.com/andries-smit>
// // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// // <reference types="dojo/dijit" />

// declare namespace mendix {
//   export interface MendixInterface {
//     lang: mendix.lang;
//     lib: mendix.lib;
//   }

//   interface lib {
//     MxObject: mendix.lib.MxObject;
//     MxContext: mendix.lib.MxContextConstructor;
//     MxMetaObject: mendix.lib.MxMetaObject;
//     ObjectValidation: mendix.lib.ObjectValidation;
//     ValidationError: mendix.lib.ValidationError;
//   }

//   namespace lib {
//     class MxObject extends MxMetaObject {
//       /**
//        * If attr is a reference attribute, sets it to the given object. If attr is a reference set attribute, adds the given object to it.
//        * @param attr The reference attribute. Can refer to either a reference or reference set attribute.
//        * @param guid GUID of the object to add to the reference
//        */
//       addReference(attribute: string, guid: string | number): boolean;
//       /**
//        * Add an object to a reference set attribute.
//        * @param attr the reference set attribute
//        * @param guids GUIDs of the objects to add to the reference
//        */
//       addReferences(attribute: string, guids: string[] | number[]): boolean;
//       /**
//        * Compare this MxObject to another MxObject and find out if they are the same.
//        * This means they have the same Entity type and their attributes have the same value.
//        */
//       compare(mxobj: mendix.lib.MxObject): boolean;
//       /**
//        * Gets an object or value of an attribute, through a path from this object.
//        * The result is passed to a callback and depends on the requested path:
//        */
//       fetch(path: string, callback: (requested: any) => void): void;
//       /**
//        * Returns the value of an attribute.
//        * For reference attributes, use mendix/lib/MxObject#getReference and mendix/lib/MxObject#getReferences instead.
//        */
//       get(attribute: string): string | number | boolean; // add external big
//       getReference(reference: string): string;
//       getOriginalValue(attribute: string): string | number | boolean; // add external big
//       getAttributes(): string[]; // Convenience method from mxMetaObject

//       getReferences(attribute: string): string[];
//       getOriginalReferences(attribute: string): string[];
//       removeReferences(attribute: string, guids: string[]): boolean;
//       set(attribute: string, value: any): boolean;
//       /**
//        * Retrieves the MxObjects referenced by a reference attribute, if these objects were retrieved together with the current one using mx.data.get's args.filter.references.
//        * Otherwise returns an empty array, including the case when the reference has been modified since retrieval. When trying to retrieve a non-reference attribute this way, an exception is thrown.
//        */
//       getChildren(attribute: string): mendix.lib.MxObject[];
//       getGuid(): string;
//       hasChanges(): boolean;
//       getEntity(): string;
//     }

//     interface MxContextConstructor {
//       new (): mendix.lib.MxContext;
//     }

//     class MxContext {
//       constructor();
//       getTrackEntity(): string;
//       getTrackId(): string;
//       getTrackObject(): mendix.lib.MxObject;
//       hasTrackEntity(): boolean;
//       hasTrackId(): boolean;
//       hasTrackObject(): boolean;
//       // Deprecated: since version 7.0, use setContext instead.
//       // setTrackId(guid: string): void;
//       // Deprecated: since version 7.0, use setContext instead.
//       // setTrackEntity(entity: string): void;
//       setTrackObject(obj: mendix.lib.MxObject): void;
//       setContext(trackEntity: string, guid: string): void;
//     }

//     type AttributeTypes =
//       | 'Enum'
//       | 'EnumSet'
//       | 'Integer'
//       | 'Long'
//       | 'Decimal'
//       | 'Float'
//       | 'Currency'
//       | 'HashString'
//       | 'Date'
//       | 'DateTime'
//       | 'Boolean'
//       | 'ObjectReference'
//       | 'ObjectReferenceSet'
//       | 'ObjectReference'
//       | 'ObjectReferenceSet';

//     class MxMetaObject {
//       getAttributes(): string[];
//       getAttributesWithoutReferences(): string[];
//       getEntity(): string;
//       getEnumCaption(attribute: string, value: string): string;
//       getEnumKVPairs(enumeration: string): { [key: string]: string };
//       getEnumMap(attribute: string): { key: string; caption: string }[];
//       getOptions(attribute: string): string[];
//       getReferenceAttributes(): string[];
//       getAttributeType(attribute: string): AttributeTypes;
//       getSelectorEntity(attribute: string): string;
//       getSubEntities(): string[];
//       getSuperEntities(): string[];
//       has(attribute: string): boolean;
//       hasSubEntities(): boolean;
//       hasSuperEntities(): boolean;
//       inheritsFrom(entityName: string): boolean;
//       isA(entityName: string): boolean;
//       isBidirectionalReference(attribute: string): boolean;
//       isBoolean(attribute: string): boolean;
//       isDate(attribute: string): boolean;
//       isEnum(attribute: string): boolean;
//       isLocalizedDate(attribute: string): boolean;
//       isNumber(attribute: string): boolean;
//       isNumeric(attribute: string): boolean;
//       isObjectReference(attribute: string): boolean;
//       isObjectReferenceSet(attribute: string): boolean;
//       isPassword(attribute: string): boolean;
//       isReadonlyAttr(attribute: string): boolean;
//       isReference(attribute: string): boolean;
//       isPersistable(): boolean;
//     }

//     class ObjectValidation {
//       addAttribute(attribute: string, message: string): boolean;
//       clone(): ObjectValidation;
//       getAttributes(): { name: string; reason: string }[];
//       getErrorReason(attribute: string): string;
//       getGuid(): string;
//       removeAttribute(attribute: string): void;
//     }

//     class ValidationError extends Error {
//       constructor(original: object);
//     }

//     namespace dataSource {
//       class DataSource {
//         setOffset: (offSet: number) => void;
//         setPageSize: (pageSize: number) => void;
//         _constraints: Constraints;
//         _entity: string;
//         _sort: string[][];
//         _sorting: string[][];
//         getOffset: () => number;
//         getPageSize: () => number;
//         getSetSize: () => number;
//         reload: (callback: () => void) => void;
//       }

//       interface GroupedOfflineConstraint {
//         constraints: OfflineConstraint[];
//         operator: 'or' | 'and';
//       }

//       type Constraints =
//         | (GroupedOfflineConstraint | OfflineConstraint)[]
//         | string;

//       interface OfflineConstraint {
//         attribute: string;
//         operator: string;
//         value: string;
//         path?: string;
//       }
//     }
//   }
//   class lang {
//     collect(chain: ChainCallback, callback?: () => void, scope?: Object): void;
//     delay(func: () => void, condition: () => boolean, period?: number): number;
//     getUniqueId(): string;
//     map<T, U>(
//       objOrArray: T[],
//       func: (callback: (value: T) => void) => U,
//       scope?: Object
//     ): U[];
//     sequence(chain: ChainCallback, callback?: () => void, scope?: Object): void;
//     // Deprecated
//     // nullExec(callback: () => void): void;
//   }

//   type ChainCallback = ((callback: () => void) => void)[];

//   class validator {
//     validation: {
//       OK: number;
//       NOT_INTEGER: number;
//       RANGE_INTEGER: number;
//       RANGE_LONG: number;
//       RANGE_DECIMAL: number;
//       RANGE_NUMBER: number;
//     };
//     validate(value: any, type: string): number;
//   }

//   class Logger {
//     error(...info: any[]): void;
//     debug(...info: any[]): void;
//     info(...info: any[]): void;
//     warn(...info: any[]): void;
//     exception(...info: any[]): void;
//     scream(...info: any[]): void;
//   }
// }

// declare module 'mendix/lib/MxObject' {
//   const obj: mendix.lib.MxObject;
//   export = obj;
// }

// declare namespace mxui {
//   namespace widget {
//     class _WidgetBase extends dijit._WidgetBase {
//       readonly uniqueid: string;
//       readonly id: string;
//       readonly friendlyId: string;
//       declaredClass: string;
//       readOnly: boolean;
//       editNode?: any;
//       mxcontext: mendix.lib.MxContext;
//       mxform: mxui.lib.form._FormBase;
//       classes: string;
//       // for dojo inheritance require to provide this signature
//       // tslint:disable-next-line ban-types
//       subscribe(t: string, method: Function): any;
//       /**
//        * Subscribe to all changes in an MxObject
//        */
//       subscribe(args: { guid: string; callback(guid: string): void }): number;
//       /**
//        * Subscribe to changes in a specific attribute of an MxObject
//        */
//       subscribe(args: {
//         guid: string;
//         attr: string;
//         callback(guid: string, attribute: string, value: any): void;
//       }): number;
//       /**
//        * Subscribe to validations of an MxObject
//        */
//       subscribe(args: {
//         guid: string;
//         val: true;
//         callback(validations: mendix.lib.ObjectValidation[]): void;
//       }): number;
//       /**
//        * Subscribe to changes in a class
//        */
//       subscribe(args: {
//         entity: string;
//         callback(entity: string): void;
//       }): number;
//       // refresh(callback?: Function);
//       unsubscribeAll(): void;
//       update(obj: mendix.lib.MxObject, callback?: () => void): void;
//       // connect(node: HTMLElement, event: string, callback: Function): any;
//     }

//     class _Button extends _WidgetBase {
//       caption: string;
//       iconUrl: string;
//       iconVisible: boolean;
//       updateOptions(
//         attributes: string[],
//         obj: mendix.lib.MxObject,
//         callback?: () => void
//       ): void;
//       enable(): void;
//       disable(): void;
//     }

//     class Progress extends _WidgetBase {
//       _msgNode: HTMLElement;
//       _messages: any[];
//       add(message: string, modal: boolean): number;
//       remove(messageId: number): void;
//     }

//     class DatePicker extends _WidgetBase {
//       constructor(args: { format: string; placeholder: string });
//     }

//     class ListView extends _WidgetBase {
//       _datasource: mendix.lib.dataSource.DataSource;
//       _entity: string;
//       _renderData: (callback?: () => void) => void;
//       _showLoadingIcon: () => void;
//       _sourceReload: () => void;
//       _onLoad: (callback?: () => void) => void;
//       _loadData: (callback: () => void) => void;
//       friendlyId: string;
//       datasource: {
//         type: 'microflow' | 'entityPath' | 'database' | 'xpath';
//       };
//       update: (obj: mendix.lib.MxObject | null, callback?: () => void) => void;
//       sequence: (sequence: string[], callback?: () => void) => void;
//       getState: (key: string, defaultValue?: any) => any;
//     }
//   }

//   namespace lib {
//     namespace form {
//       class _FormBase {
//         domNode: HTMLElement;
//         hash: string;
//         id: string;
//         path: string;
//         place: string;
//         title: string;
//         url: string;
//         viewState?: { [key: string]: any };
//         constructor();
//         onLoading(): void;
//         onPersistViewState(): void;
//         callRecursive(method: string, ...param: any[]): void;
//         close(): void;
//         commit(callback: () => void, error?: (error: Error) => void): void;
//         getChildren(nested?: boolean): mxui.widget._WidgetBase[];
//         listen(
//           event: 'validate' | 'submit' | 'commit' | 'rollback',
//           process: (success: () => void, error: (error: Error) => void) => void
//         ): number;
//         publish(
//           message: string,
//           callback: () => void,
//           error: (error: Error) => void
//         ): void;
//         rollback(callback: () => void, error?: (error: Error) => void): void;
//         // Deprecated: since version 6.8, use mx.data.commit instead
//         // save(callback: () => void, error?: (error: Error) => void): void;
//         unlisten(handle: number): void;
//         validate(callback: () => void, error?: (error: Error) => void): void;
//         enable(): void;
//         disable(): void;
//         onNavigation(): void;
//       }

//       class InlineForm {
//         constructor();
//         destroy(): void;
//       }
//     }
//   }

//   class dom {
//     static escapeHTMLQuotes: (valueString: string) => string;
//     /**
//      * Add a link to the given stylesheet to a document.
//      * @param path - path of the stylesheet location
//      * @param doc - document to add the stylesheet link to. Defaults to document.
//      * @media media - string describing the media types supported by the stylesheet
//      */
//     static addCss: (path: string, doc?: Document, media?: string) => void;
//     static create: (
//       element: string,
//       props?: Object,
//       ...children: HTMLElement[]
//     ) => HTMLElement;
//     // create: (element: string, props?: Object, value?: string) => HTMLElement;
//     static disableNode: (node: HTMLElement) => HTMLElement;
//     static enableNode: (node: HTMLElement) => HTMLElement;
//     static escapeString: (valueString: string) => string;
//     static getCss: (path: string, doc?: Document) => HTMLLinkElement;
//     static getCursorPosition: (input: HTMLInputElement) => number;
//     static getSelectedText: (node: HTMLSelectElement) => string;
//     static getSelectedValue: (node: HTMLSelectElement) => string;
//     static getSelection: (
//       input: HTMLInputElement
//     ) => { start: number; end: number };
//     static removeCss: (filePath: string, doc?: Document) => boolean;
//     static selectTextRange: (
//       input: HTMLInputElement,
//       selectionStart: number,
//       selectionEnd: number
//     ) => void;
//     static setSelectOptions: (
//       node: HTMLSelectElement,
//       options: Object,
//       selected: string
//     ) => void;
//   }

//   namespace html {
//     interface parser {
//       instantiate(
//         list: HTMLElement[],
//         defaults: Object
//       ): mxui.widget._WidgetBase[];
//       parse(root: HTMLElement, defaults: Object): mxui.widget._WidgetBase[];
//     }
//   }
// }

declare namespace mx {
  export interface MxInterface {
    appUrl: string;
    baseUrl: string;
    modulePath: string;
    remoteUrl: string;
    data: mx.data;
    meta: mx.meta;
    parser: mx.parser;
    server: mx.server;
    session: mx.session;
    ui: mx.ui;
    version: string;
    onlineData: OnlineData;
    addOnLoad(callback: () => void): void;
    login(
      username: string,
      password: string,
      onSuccess: () => void,
      onError: () => void
    ): void;
    logout(): void;
    onError(error: Error): void;
    isOffline(): boolean;
  }

  //   type Sort = [string, 'desc' | 'asc'];
  //   type FilterOperator =
  //     | 'equals'
  //     | 'lessThan'
  //     | 'lessThanOrEquals'
  //     | 'greaterThan'
  //     | 'greaterThanOrEquals'
  //     | 'contains';
  //   interface ReferencesSpec {
  //     attributes: string[];
  //     amount: number;
  //     sort: Sort;
  //   }
  //   interface OfflineFilter {
  //     offset?: number;
  //     limit?: number;
  //     sort?: Sort[];
  //   }
  //   interface OfflineConstraint {
  //     attribute: string;
  //     operator: string;
  //     value: string | number;
  //     negate?: boolean;
  //   }
  //   interface OnlineData {
  //     getByXpath(
  //       xpath: string,
  //       options?: { count: boolean; sort: Sort[] }
  //     ): Promise<{ count: number; mxobjs: mendix.lib.MxObject[] }>;
  //   }

  //   interface Nanoflow {
  //     nanoflow: object[];
  //     paramsSpec: { Progress: string };
  //   }

  //   interface ContentForm {
  //     id: string;
  //     path: string;
  //     url: string;
  //     navigateTo: () => void;
  //     onLoading: () => void;
  //     onNavigation: () => void;
  //     onPersistViewStaate: () => void;
  //   }

  //   interface data {
  //     action(
  //       action: {
  //         params: {
  //           actionname: string;
  //           applyto?: string;
  //           guids?: string[];
  //           xpath?: string;
  //           constraints?: string;
  //           sort?: Sort[];
  //           gridid?: string;
  //         };
  //         context?: mendix.lib.MxContext;
  //         origin?: mxui.lib.form._FormBase;
  //         async?: boolean;
  //         callback?: (
  //           result:
  //             | mendix.lib.MxObject
  //             | mendix.lib.MxObject[]
  //             | boolean
  //             | number
  //             | string
  //         ) => void;
  //         error?: (error: Error) => void;
  //         onValidation?: (validations: mendix.lib.ObjectValidation[]) => void;
  //       },
  //       scope?: Object
  //     ): void;
  //     callNanoflow(args: {
  //       nanoflow: mx.Nanoflow;
  //       origin: mxui.lib.form._FormBase;
  //       context: mendix.lib.MxContext;
  //       callback?: (
  //         result:
  //           | mendix.lib.MxObject
  //           | mendix.lib.MxObject[]
  //           | boolean
  //           | number
  //           | string
  //       ) => void;
  //       error?: (error: Error) => void;
  //     }): void;
  //     commit(
  //       args: {
  //         mxobj: mendix.lib.MxObject;
  //         callback: () => void;
  //         error?: (error: Error) => void;
  //         onValidation?: (validations: mendix.lib.ObjectValidation[]) => void;
  //       },
  //       scope?: Object
  //     ): void;
  //     commit(
  //       args: {
  //         mxobjs: mendix.lib.MxObject[];
  //         callback: () => void;
  //         error?: (error: Error) => void;
  //         onValidation?: (validations: mendix.lib.ObjectValidation[]) => void;
  //       },
  //       scope?: Object
  //     ): void;
  //     create(
  //       arg: {
  //         entity: string;
  //         callback: (obj: mendix.lib.MxObject) => void;
  //         error: (error: Error) => void;
  //       },
  //       scope?: Object
  //     ): void;
  //     createXPathString(arg: {
  //       entity: string;
  //       context: mendix.lib.MxContext;
  //       callback: (xpath: string, allMatched: boolean) => void;
  //     }): void;
  //     /**
  //      * Retrieves MxObjects from the Runtime. Using guid
  //      */
  //     get(
  //       args: {
  //         guid: string;
  //         noCache?: boolean;
  //         count?: boolean;
  //         path?: string;
  //         callback: (object: mendix.lib.MxObject) => void;
  //         error?: (error: Error) => void;
  //         filter?: {
  //           id?: string;
  //           attributes?: string[];
  //           offset?: number;
  //           sort?: Sort[];
  //           amount?: number;
  //           distinct?: boolean;
  //           references?: ReferencesSpec;
  //         };
  //       },
  //       scope?: Object
  //     ): void;
  //     /**
  //      * Retrieves MxObjects from the Runtime. Using guids
  //      */
  //     get(
  //       args: {
  //         guids: string[];
  //         noCache?: boolean;
  //         count?: boolean;
  //         path?: string;
  //         callback: (objects: mendix.lib.MxObject[]) => void;
  //         error?: (error: Error) => void;
  //         filter?: {
  //           id?: string;
  //           attributes?: string[];
  //           offset?: number;
  //           sort?: Sort[];
  //           amount?: number;
  //           distinct?: boolean;
  //           references?: ReferencesSpec;
  //         };
  //       },
  //       scope?: Object
  //     ): void;
  //     /**
  //      * Retrieves MxObjects from the Runtime. Using xpath
  //      */
  //     get(
  //       args: {
  //         xpath: string;
  //         noCache?: boolean;
  //         count?: boolean;
  //         path?: string;
  //         callback: (objects: mendix.lib.MxObject[]) => void;
  //         error?: (error: Error) => void;
  //         filter?: {
  //           id?: string;
  //           attributes?: string[];
  //           offset?: number;
  //           sort?: Sort[];
  //           amount?: number;
  //           distinct?: boolean;
  //           references?: ReferencesSpec;
  //         };
  //       },
  //       scope?: Object
  //     ): void;
  //     /**
  //      * Retrieves MxObjects from the Runtime. Using microflow
  //      */
  //     get(
  //       args: {
  //         microflow: string;
  //         noCache?: boolean;
  //         count?: boolean;
  //         path?: string;
  //         callback: (result?: any) => void;
  //         error: (error: Error) => void;
  //         filter?: {
  //           id: string;
  //           attributes: string[];
  //           offset: number;
  //           sort: Sort[];
  //           amount: number;
  //           distinct: boolean;
  //           references: ReferencesSpec;
  //         };
  //       },
  //       scope?: Object
  //     ): void;
  //     // Deprecated: since version 7.0.
  //     // getBacktrackConstraints(metaObject: mendix.lib.MxMetaObject, context: mendix.lib.MxContext, callback: (xpath: string, allMatched: boolean) => void): void;
  //     getOffline(
  //       entity: string,
  //       constraints?: OfflineConstraint[],
  //       filter?: OfflineFilter,
  //       callback?: (objects: mendix.lib.MxObject[], count: number) => void,
  //       error?: (error: Error) => void
  //     ): void;
  //     getDocumentUrl(
  //       guid: string,
  //       changedDate: number,
  //       isThumbnail?: boolean
  //     ): string;
  //     getImageUrl(
  //       url: string,
  //       callback: (objectUrl: string) => void,
  //       error?: (error: Error) => void
  //     ): void;
  //     // Deprecated since version 7.0. Mendix objects don't have to be released anymore. A Mendix object is kept in cache as long as there is a subscription to it.
  //     // release(objects: mendix.lib.MxObject | mendix.lib.MxObject[]): void;
  //     remove(
  //       arg: {
  //         guid?: string;
  //         guids?: string[];
  //         callback: () => void;
  //         error: (error: Error) => void;
  //       },
  //       scope?: Object
  //     ): void;
  //     rollback(
  //       args: {
  //         mxobj: mendix.lib.MxObject;
  //         callback: () => void;
  //         error: (error: Error) => void;
  //       },
  //       scope?: Object
  //     ): void;
  //     // Deprecated: since version 6.8, use mx.data.commit and mx.data.action instead
  //     // save(args: {
  //     //     mxobj?: mendix.lib.MxObject;
  //     //     callback?: () => void,
  //     //     error?: (error: Error) => void,
  //     // }, scope?: Object): void;
  //     /**
  //      * Registers a callback to be invoked on changes in an attribute of a MxObject
  //      */
  //     subscribe(args: {
  //       guid: string;
  //       attr: string;
  //       callback: (guid: number, attr: string, attrValue: any) => void;
  //     }): number;
  //     /**
  //      * Registers a callback to be invoked on validations errors in a specific MxObject.
  //      */
  //     subscribe(args: {
  //       guid: string;
  //       val: boolean;
  //       callback: (validations: mendix.lib.ObjectValidation[]) => void;
  //     }): number;
  //     /**
  //      * Registers a callback to be invoked on changes specific entity
  //      */
  //     subscribe(args: {
  //       entity: string;
  //       callback: (entity: string) => void;
  //     }): number;
  //     /**
  //      * Registers a callback to be invoked on changes in an MxObject
  //      */
  //     subscribe(args: { guid: string; callback: (guid: number) => void }): number;
  //     unsubscribe(handle: number): void;
  //     update(args: { guid?: string; entity?: string }): void;
  //     // update attribute
  //     update(args: { guid: string; attr: string }): void;
  //     saveDocument(
  //       guid: string,
  //       name: string,
  //       params: { width?: number; height?: number },
  //       blob: Blob,
  //       callback: () => void,
  //       error: (error: Error) => void
  //     ): void;
  //     synchronizeDataWithFiles(
  //       successCallback: () => void,
  //       failureCallback: (error: Error) => void
  //     ): void;
  //     synchronizeOffline(
  //       options: { fast: boolean },
  //       successCallback: () => void,
  //       failureCallback: (error: Error) => void
  //     ): void;
  //   }

  //   interface meta {
  //     getEntity(entity: string): mendix.lib.MxMetaObject;
  //     // getMap(): { [key: string]: mendix.lib.MxMetaObject };
  //   }

  //   // type MendixAttributeType = "float" | "currency" | "autonumber" | "integer" | "long" | "decimal" | "datetime" | "boolean" | "binary" | "string" | "hashstring" | "enum";
  //   interface parser {
  //     formatAttribute(
  //       object: mendix.lib.MxObject,
  //       attribute: string,
  //       props?: any
  //     ): string;
  //     formatValue(value: any, type: string, props?: any): string;
  //     parseValue(
  //       value: string,
  //       type: 'autonumber' | 'string' | 'hashstring' | 'enum',
  //       props?: any
  //     ): string;
  //     parseValue(value: string, type: 'boolean', props?: any): boolean;
  //     parseValue(value: string, type: 'datetime', props?: any): Date; // Date
  //     parseValue(
  //       value: string,
  //       type: 'float' | 'currency' | 'integer' | 'long' | 'decimal',
  //       props?: any
  //     ): any; // should be Big;
  //     delocalizeEpoch(value: Date): number;
  //   }

  //   interface server {
  //     get(args: {
  //       url: string;
  //       handleAs: 'text';
  //       load: (response: string) => void;
  //       error: (error: Error) => void;
  //     }): void;
  //     get(args: {
  //       url: string;
  //       handleAs: 'json';
  //       load: (response: Object) => void;
  //       error: (error: Error) => void;
  //     }): void;
  //     get(args: {
  //       url: string;
  //       handleAs: 'xml';
  //       load: (response: Document) => void;
  //       error: (error: Error) => void;
  //     }): void;
  //     getCacheBust(): string;
  //     // Deprecated since version 7.0, use methods of mx.data instead to access or operate on objects or to invoke microflows.
  //     // request(args);
  //   }
  //   interface Locale {
  //     code: string;
  //     firstDayOfWeek: number;
  //     minimalDaysInFirstWeek: number;
  //   }
  //   interface SessionData {
  //     locale: Locale;
  //   }
  //   interface session {
  //     sessionData: SessionData;
  //     getUserId(): string;
  //     getCSRFToken(): string;
  //     getConfig(value: string): string;
  //     getUserAttribute(attribute: string): any;
  //     getUserClass(): string;
  //     getUserName(): string;
  //     isGuest(): boolean;
  //   }

  interface ui {
    /**
     * Executes a Microflow from the UI.
     * This is basically a wrapper around mx.data.action, giving the option of showing a progress bar while running the Microflow.
     * @param actionname name of the Microflow to execute
     * @param action set parameters for call action.
     * @param action.progress If set, a progress indicator is shown while running the Microflow. When set to modal the indicator is modal, otherwise it is not.
     * @param scope in which to execute the callback and error callbacks
     */
    action(
      actionname: string,
      action: {
        progress?: string;
        progressMsg?: string;
        params?: {
          applyto?: string;
          guids?: string[];
          xpath?: string;
          constraints?: string;
          sort?: Sort[];
          gridid?: string;
        };
        context?: mendix.lib.MxContext;
        origin?: mxui.lib.form._FormBase;
        async?: boolean;
        callback?: (
          result:
            | mendix.lib.MxObject
            | mendix.lib.MxObject[]
            | boolean
            | number
            | string
        ) => void;
        error?: (error: Error) => void;
        onValidation?: (validations: mendix.lib.ObjectValidation[]) => void;
      },
      scope?: Object
    ): void;

    /**
     * Goes one step back in history, closing the current in content Form.
     */
    back(): void;
    /**
     * Shows a confirmation dialog before calling a given function.
     */
    confirmation(args: {
      content: string;
      proceed: string;
      cancel: string;
      handler: () => void;
    }): void;
    /**
     * Shows an error message.
     */
    error(message: string, modal?: boolean): void;
    /**
     * Shows a message for a fatal error in a modal dialog.
     */
    exception(message: string): void;
    /**
     *
     */
    showProgress(message?: string | null, isBlocking?: boolean): number;
    /**
     * Hides the loading dialog.
     */
    hideProgress(pid: number): void;
    /**
     * Shows an information message.
     */
    info(message: string, modal: boolean): void;
    onError(error: Error): void;
    showUnderlay(delay?: number): void;
    hideUnderlay(delay?: number): void;
    resize(): void;
    isRtl(): string;
    /**
     * Opens a form, either in content, in a DOM node or in a (modal) popup
     */
    openForm(
      path: string,
      args: {
        location: 'content' | 'popup' | 'modal' | 'node';
        domNode?: HTMLElement;
        title?: string;
        context?: mendix.lib.MxContext;
        callback?(form: mxui.lib.form._FormBase): void;
        error?(error: Error): void;
      },
      scope?: Object
    ): void;
    getTemplate(mxid: string, content: string): DocumentFragment;
    showLogin(messageCode: number): void;
    reload(callback?: () => void): void;
    // translate(systemTextCategory: string, systemTextItem: string, parameterValues?: any[]): string;

    getContentForm(): mxui.lib.form._FormBase;
  }
}

// declare module 'mxui/widget/_WidgetBase' {
//   const _WidgetBase: typeof mxui.widget._WidgetBase;
//   export = _WidgetBase;
// }

// declare module 'mxui/dom' {
//   const array: mxui.dom;
//   export = array;
// }

// declare module 'mendix/lang' {
//   const lang: mendix.lang;
//   export = lang;
// }

// declare module 'mendix/validator' {
//   const validator: mendix.validator;
//   export = validator;
// }

// declare module 'mendix/logger' {
//   const loggerObject: mendix.Logger;
//   export = loggerObject;
// }

// // Declaration of mendix global variables
// declare const logger: mendix.Logger;
// declare const mx: mx.MxInterface;

interface Window {
  mendix: mendix.MendixInterface;
  mx: mx.MxInterface;
  logger: mendix.Logger;
  dojoConfig: {
    remotebase?: string;
  };
}
