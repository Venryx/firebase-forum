import { LogTypes } from "./Utils/Logging";

export class PermissionGroupSet {
	basic: boolean;
	verified: boolean;
	mod: boolean;
	admin: boolean;
}

export class Manager {
	static store;
	static rootStorePath: string;
	static rootReducer: Function;
	static State_overrides;
	static GetNewURL: Function;
	static FormatTime: (time: number, formatStr: string)=>string;

	static router_replace: (newURL: string)=>any;
	static router_push: (newURL: string)=>any;
	
	static logTypes = new LogTypes();

	//static FirebaseConnect: (func: Function)=>any; // must set "window.FirebaseConnect" manually
	static GetData: ()=>any;
	static GetDataAsync: ()=>any;
	static GetAsync: (dbGetterFunc, statsLogger)=>Promise<any>;
	static ShowSignInPopup: ()=>void;
	static GetUserID: ()=>string;
	static GetUser: (id: string)=>any;
	static GetUserPermissionGroups: (userID: string)=>PermissionGroupSet;

	static MarkdownRenderer: (...props: any[])=>JSX.Element;
}