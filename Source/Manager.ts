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
	actions?: Action<any>[], //updateURLOnActions?: boolean, // action-based
} & React.HTMLProps<HTMLAnchorElement>;

export class Manager {
	Populate(data: Omit<Manager, "Populate" | "store">) {
		this.Extend(data);
		OnPopulated_listeners.forEach(a=>a());
	}

	GetStore: ()=>any;
	get store() { return this.GetStore(); }
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

export let OnPopulated_listeners = [];
export function OnPopulated(listener: ()=>any) { OnPopulated_listeners.push(listener); }