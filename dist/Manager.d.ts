import { LogTypes } from "./Utils/Logging";
import { Action } from "./Utils/Action";
import { BaseComponent } from "react-vextensions";
export declare class PermissionGroupSet {
    basic: boolean;
    verified: boolean;
    mod: boolean;
    admin: boolean;
}
export declare type Link_Props = {
    onClick?: any;
    style?: any;
    text?: string;
    to?: string;
    target?: string;
    replace?: boolean;
    actions?: Action<any>[];
} & React.HTMLProps<HTMLAnchorElement>;
export declare type Omit<T, K extends keyof T> = Pick<T, ({
    [P in keyof T]: P;
} & {
    [P in K]: never;
})[keyof T]>;
export declare class Manager {
    Populate(data: Omit<Manager, "Populate" | "store">): void;
    GetStore: () => any;
    readonly store: any;
    storePath_mainData: string;
    storePath_dbData: string;
    Link: new () => (BaseComponent<Link_Props, {}> & {
        render: () => JSX.Element | null;
    });
    FormatTime: (time: number, formatStr: string) => string;
    router_replace: (newURL: string) => any;
    router_push: (newURL: string) => any;
    logTypes: LogTypes;
    Connect: (func: Function) => any;
    State: (...props: any[]) => any;
    GetData: (..._: any[]) => any;
    GetDataAsync: (..._: any[]) => any;
    GetAsync: (dbGetterFunc: any, statsLogger: any) => Promise<any>;
    ShowSignInPopup: () => void;
    GetUserID: () => string;
    GetUser: (id: string) => any;
    GetUserPermissionGroups: (userID: string) => PermissionGroupSet;
    ApplyDBUpdates: (rootPath: string, dbUpdates: any) => void;
    MarkdownRenderer: any;
}
export declare const manager: Manager;
export declare let OnPopulated_listeners: any[];
export declare function OnPopulated(listener: () => any): void;
