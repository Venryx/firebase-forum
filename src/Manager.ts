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

export class Manager {
	static store;
	static storePath_mainData: string;
	static storePath_dbData: string;
	static Link: new ()=>(BaseComponent<Link_Props, {}>
		& {render: ()=>JSX.Element | null}); // temp fix for typing issue ("render" returning Element | null | false, in one version)
	static FormatTime: (time: number, formatStr: string)=>string;

	static router_replace: (newURL: string)=>any;
	static router_push: (newURL: string)=>any;
	
	static logTypes = new LogTypes();

	//static FirebaseConnect: (func: Function)=>any; // must set "window.FirebaseConnect" manually
	static State: (...props)=>any;
	static GetData: (..._)=>any;
	static GetDataAsync: (..._)=>any;
	static GetAsync: (dbGetterFunc, statsLogger)=>Promise<any>;
	static ShowSignInPopup: ()=>void;
	static GetUserID: ()=>string;
	static GetUser: (id: string)=>any;
	static GetUserPermissionGroups: (userID: string)=>PermissionGroupSet;

	static ApplyDBUpdates: (rootPath: string, dbUpdates)=>void;

	static MarkdownRenderer: any; //(...props: any[])=>JSX.Element;
}