import {DeepGet} from "js-vextensions";
import {Manager} from "./Manager";
import {Post} from "./Store/firebase/forum/@Post";
import {Thread} from "./Store/firebase/forum/@Thread";

export function RemoveDuplicates(items: any) {
	var result = [];
	for (let item of items) {
		if (result.indexOf(item) == -1) {
			result.push(item);
		}
	}
	return result;
}

// for substantially better perf, we now only accept string-or-number arrays
export type RootState = any;
/*declare global {
	function State<T>(): RootState;
	function State<T>(pathGetterFunc: (state: RootState)=>T);
	function State<T>(...pathSegments: (string | number)[]);
	//function State<T>(options: State_Options, ...pathSegments: (string | number)[]);
}*/
export function State<T>(...args) {
	let pathSegments: (string | number)[]; //, options = new State_Options();
	//if (args.length == 0) return State_overrides.state || store.getState();
	if (args.length == 0) return store.getState();
	//else if (typeof args[0] == "function") pathSegments = ConvertPathGetterFuncToPropChain(args[0]);
	else if (typeof args[0] == "string") pathSegments = args;
	//else [options, ...pathSegments] = args;
	else [...pathSegments] = args;

	/*if (__DEV__) {
		Assert(pathSegments.All(segment=>segment != null), `Path-segment cannot be null. @segments(${pathSegments})`);
		Assert(pathSegments.All(segment=>typeof segment == "number" || !segment.Contains("/")),
			`Each string path-segment must be a plain prop-name. (ie. contain no "/" separators) @segments(${pathSegments})`);
	}*/
	
	/*let selectedData = DeepGet(store.getState(), Manager.storePath_mainData + "/" + pathSegments.join("/"));
	return selectedData;*/

	return Manager.State(...Manager.storePath_mainData.split("/").concat(pathSegments as any));
}
/*function ConvertPathGetterFuncToPropChain(pathGetterFunc: Function) {
	let pathStr = pathGetterFunc.toString().match(/return a\.(.+?);/)[1] as string;
	Assert(!pathStr.includes("["), `State-getter-func cannot contain bracket-based property-access.\n\n${""
		}For variable inclusion, use multiple segments as in "State("main", "mapViews", mapID)".`);
	//let result = pathStr.replace(/\./g, "/");
	let result = pathStr.split(".");
	return result;
}*/

export var emptyArray = [];

export enum AccessLevel {
	Basic = 10,
	Verified = 20, // for accounts we're pretty sure are legitimate (an actual person's only account)
	Mod = 30,
	Admin = 40,
}

/*export function GetUserPermissionGroups(userID: string): PermissionGroupSet {
	if (userID == null) return null;
	return GetData("userExtras", userID, "permissionGroups");
}*/
export function GetUserAccessLevel(userID: string) {
	let groups = Manager.GetUserPermissionGroups(userID);
	if (groups == null) return AccessLevel.Basic;
	
	if (groups.admin) return AccessLevel.Admin;
	if (groups.mod) return AccessLevel.Mod;
	if (groups.verified) return AccessLevel.Verified;
	//if (groups.basic) return AccessLevel.Basic;
	Assert(false);
}
export function IsUserBasic(userID: string) { return (Manager.GetUserPermissionGroups(userID) || {} as any).basic; }
export function IsUserVerified(userID: string) { return (Manager.GetUserPermissionGroups(userID) || {} as any).verified; }
export function IsUserMod(userID: string) { return (Manager.GetUserPermissionGroups(userID) || {} as any).mod; }
export function IsUserAdmin(userID: string) { return (Manager.GetUserPermissionGroups(userID) || {} as any).admin; }

export function IsUserBasicOrAnon(userID: string) {
	let permissionGroups = Manager.GetUserPermissionGroups(userID);
	return permissionGroups == null || permissionGroups.basic;
}
export function IsUserCreatorOrMod(userID: string, entity: Post | Thread) {
	let permissionGroups = Manager.GetUserPermissionGroups(userID);
	if (permissionGroups == null) return false;
	return (entity.creator == userID && permissionGroups.basic) || permissionGroups.mod;
}