import { LogTypes } from "./Utils/Logging";
import {Action} from "./Utils/Action";
import {BaseComponent} from "react-vextensions";

export class PermissionGroupSet {
	basic: boolean;
	verified: boolean;
	mod: boolean;
	admin: boolean;
}

export type Link_Props = {
	onClick?, style?,
	text?: string, to?: string, target?: string, replace?: boolean, // url-based
	actions?: (dispatch: Function)=>void, //updateURLOnActions?: boolean, // action-based
} & React.HTMLProps<HTMLAnchorElement>;

export type Omit<T, K extends keyof T> = Pick<T, ({ [P in keyof T]: P } & { [P in K]: never })[keyof T]>;
export class Manager {
	onPopulated = new Promise((resolve, reject)=>this.onPopulated_resolve = resolve);
	onPopulated_resolve: Function;
	Populate(data: Omit<Manager, "onPopulated" | "onPopulated_resolve" | "Populate">) {
		this.Extend(data);
		this.onPopulated_resolve();
	}

	store;
	storePath_mainData: string;
	storePath_dbData: string;
	Link: new ()=>(BaseComponent<Link_Props, {}>
		& {render: ()=>JSX.Element | null}); // temp fix for typing issue ("render" returning Element | null | false, in one version)
	FormatTime: (time: number, formatStr: string)=>string;

	router_replace: (newURL: string)=>any;
	router_push: (newURL: string)=>any;
	
	logTypes = new LogTypes();

	Connect: (func: Function)=>any;
	State: (...props)=>any;
	GetData: (..._)=>any;
	GetDataAsync: (..._)=>any;
	GetAsync: (dbGetterFunc, statsLogger)=>Promise<any>;
	ShowSignInPopup: ()=>void;
	GetUserID: ()=>string;
	GetUser: (id: string)=>any;
	GetUserPermissionGroups: (userID: string)=>PermissionGroupSet;

	ApplyDBUpdates: (rootPath: string, dbUpdates)=>void;

	MarkdownRenderer: any; //(...props: any[])=>JSX.Element;
}
export const manager = new Manager();