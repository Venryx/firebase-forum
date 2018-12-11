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
export declare type Omit<T, K extends keyof T> = Pick<T, ({
    [P in keyof T]: P;
} & {
    [P in K]: never;
})[keyof T]>;
export declare class Manager {
    onPopulated: Promise<{}>;
    onPopulated_resolve: Function;
    Populate(data: Omit<Manager, "onPopulated" | "onPopulated_resolve" | "Populate">): void;
    store: any;
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
    State: (...props) => any;
    GetData: (..._) => any;
    GetDataAsync: (..._) => any;
    GetAsync: (dbGetterFunc, statsLogger) => Promise<any>;
    ShowSignInPopup: () => void;
    GetUserID: () => string;
    GetUser: (id: string) => any;
    GetUserPermissionGroups: (userID: string) => PermissionGroupSet;
    ApplyDBUpdates: (rootPath: string, dbUpdates) => void;
    MarkdownRenderer: any;
}
export declare const manager: Manager;
