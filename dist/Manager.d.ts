/// <reference types="react" />
import { LogTypes } from "./Utils/Logging";
import { BaseComponent } from "react-vextensions";
export declare class PermissionGroupSet {
    basic: boolean;
    verified: boolean;
    mod: boolean;
    admin: boolean;
}
export declare type Link_Props = {
    onClick?;
    style?;
    text?: string;
    to?: string;
    target?: string;
    replace?: boolean;
    actions?: (dispatch: Function) => void;
} & React.HTMLProps<HTMLAnchorElement>;
export declare class Manager {
    static store: any;
    static storePath_mainData: string;
    static storePath_dbData: string;
    static Link: new () => (BaseComponent<Link_Props, {}> & {
        render: () => JSX.Element | null;
    });
    static FormatTime: (time: number, formatStr: string) => string;
    static router_replace: (newURL: string) => any;
    static router_push: (newURL: string) => any;
    static logTypes: LogTypes;
    static State: (...props) => any;
    static GetData: (..._) => any;
    static GetDataAsync: (..._) => any;
    static GetAsync: (dbGetterFunc, statsLogger) => Promise<any>;
    static ShowSignInPopup: () => void;
    static GetUserID: () => string;
    static GetUser: (id: string) => any;
    static GetUserPermissionGroups: (userID: string) => PermissionGroupSet;
    static ApplyDBUpdates: (rootPath: string, dbUpdates) => void;
    static MarkdownRenderer: any;
}
