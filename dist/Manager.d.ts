import { LogTypes } from "./Utils/Logging";
export declare class PermissionGroupSet {
    basic: boolean;
    verified: boolean;
    mod: boolean;
    admin: boolean;
}
export declare class Manager {
    static store: any;
    static storePath_mainData: string;
    static storePath_dbData: string;
    static rootReducer: Function;
    static State_overrides: any;
    static GetNewURL: Function;
    static FormatTime: (time: number, formatStr: string) => string;
    static router_replace: (newURL: string) => any;
    static router_push: (newURL: string) => any;
    static logTypes: LogTypes;
    static State: (...props) => any;
    static GetData: () => any;
    static GetDataAsync: () => any;
    static GetAsync: (dbGetterFunc, statsLogger) => Promise<any>;
    static ShowSignInPopup: () => void;
    static GetUserID: () => string;
    static GetUser: (id: string) => any;
    static GetUserPermissionGroups: (userID: string) => PermissionGroupSet;
    static ApplyDBUpdates: (rootPath: string, dbUpdates) => void;
    static MarkdownRenderer: any;
}
