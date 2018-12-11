import { Assert, DeepSet, GetTreeNodesInObjTree } from "js-vextensions";
import { SplitStringBySlash_Cached } from "./StringSplitCache";
import { manager } from "../..";

export function DBPath(path = "", inVersionRoot = true) {
	Assert(path != null, "Path cannot be null.");
	Assert(IsString(path), "Path must be a string.");
	/*let versionPrefix = path.match(/^v[0-9]+/);
	if (versionPrefix == null) // if no version prefix already, add one (referencing the current version)*/
	if (inVersionRoot) {
		path = `${manager.storePath_dbData}${path ? `/${path}` : ""}`;
	}
	return path;
}
export function DBPathSegments(pathSegments: (string | number)[], inVersionRoot = true) {
	let result = pathSegments;
	if (inVersionRoot) {
		result = manager.storePath_dbData.split("/").concat(result as any);
	}
	return result;
}

export function SlicePath(path: string, removeFromEndCount: number, ...itemsToAdd: string[]) {
	//let parts = path.split("/");
	let parts = SplitStringBySlash_Cached(path).slice();
	parts.splice(parts.length - removeFromEndCount, removeFromEndCount, ...itemsToAdd);
	return parts.join("/");
}

let helperProps = ["_key", "_id"];
/** Note: this mutates the original object. */
export function RemoveHelpers(data) {
	var treeNodes = GetTreeNodesInObjTree(data, true);
	for (let treeNode of treeNodes) {
		if (helperProps.Contains(treeNode.prop))
			delete treeNode.obj[treeNode.prop];
	}
	return data;
}
export function GetUpdates(oldData, newData, useNullInsteadOfUndefined = true) {
	let result = {};
	for (let key of oldData.VKeys(true).concat(newData.VKeys(true))) {
		if (newData[key] !== oldData[key]) {
			result[key] = newData[key];
			if (newData[key] === undefined && useNullInsteadOfUndefined) {
				result[key] = null;
			}
		}
	}
	return RemoveHelpers(result);
}

export class GetData_Options {
	makeRequest? = true;
	useUndefinedForInProgress? = false;
	queries?: any;
}

export function GetData(...pathSegments: (string | number)[]);
export function GetData(options: GetData_Options, ...pathSegments: (string | number)[]);
export function GetData(...args) {
	let pathSegments: (string | number)[], options: GetData_Options;
	if (typeof args[0] == "string") pathSegments = args;
	else [options, ...pathSegments] = args;
	options = E(new GetData_Options(), options);

	return manager.GetData(options, ...manager.storePath_dbData.split("/").concat(pathSegments as any));
}

export class GetDataAsync_Options {
	addHelpers? = true;
}

export async function GetDataAsync(...pathSegments: (string | number)[]);
export async function GetDataAsync(options: GetDataAsync_Options, ...pathSegments: (string | number)[]);
export async function GetDataAsync(...args) {
	let pathSegments: (string | number)[], options: GetDataAsync_Options;
	if (typeof args[0] == "string") pathSegments = args;
	else [options, ...pathSegments] = args;
	options = E(new GetDataAsync_Options(), options);

	return manager.GetDataAsync(options, ...manager.storePath_dbData.split("/").concat(pathSegments as any));
}

export async function GetAsync<T>(dbGetterFunc: ()=>T, statsLogger?: ({requestedPaths: string})=>void): Promise<T> {
	return await manager.GetAsync(dbGetterFunc, statsLogger);
}