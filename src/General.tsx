import {store, rootStorePathSegments} from "./Manager";
export function E<E1,E2,E3,E4,E5,E6,E7,E8>(e1?:E1,e2?:E2,e3?:E3,e4?:E4,e5?:E5,e6?:E6,e7?:E7,e8?:E8):E1&E2&E3&E4&E5&E6&E7&E8 {
	var result = {} as any;
	for (var extend of arguments)
		result.Extend(extend);
	return result;
	//return StyleSheet.create(result);
}

export function ToJSON(obj) { return JSON.stringify(obj); }
export function FromJSON(json) { return JSON.parse(json); }

export function RemoveDuplicates(items: any) {
	var result = [];
	for (let item of items) {
		if (result.indexOf(item) == -1) {
			result.push(item);
		}
	}
	return result;
}

export function Assert(condition, messageOrMessageFunc?: string | Function) {
	if (condition) return;

	var message = (messageOrMessageFunc as any) instanceof Function ? (messageOrMessageFunc as any)() : messageOrMessageFunc;

	//console.log(`Assert failed) ${message}\n\nStackTrace) ${GetStackTraceStr()}`);
	console.error("Assert failed) " + message);
	debugger;
	throw new Error("Assert failed) " + message);
}
export function AssertWarn(condition, messageOrMessageFunc?: string | Function) {
	if (condition) return;

	var message = messageOrMessageFunc instanceof Function ? messageOrMessageFunc() : messageOrMessageFunc;

	console.warn(`Assert-warn failed) ${message}\n\nStackTrace)`); // ${GetStackTraceStr()}`);
}

// for substantially better perf, we now only accept string-or-number arrays
export type RootState = {};
declare global {
	function State<T>(): RootState;
	function State<T>(pathGetterFunc: (state: RootState)=>T);
	function State<T>(...pathSegments: (string | number)[]);
	//function State<T>(options: State_Options, ...pathSegments: (string | number)[]);
}
function State<T>(...args) {
	let pathSegments: (string | number)[]; //, options = new State_Options();
	//if (args.length == 0) return State_overrides.state || store.getState();
	if (args.length == 0) return store.getState();
	else if (typeof args[0] == "function") pathSegments = ConvertPathGetterFuncToPropChain(args[0]);
	else if (typeof args[0] == "string") pathSegments = args;
	//else [options, ...pathSegments] = args;
	else [...pathSegments] = args;

	/*if (__DEV__) {
		Assert(pathSegments.All(segment=>segment != null), `Path-segment cannot be null. @segments(${pathSegments})`);
		Assert(pathSegments.All(segment=>typeof segment == "number" || !segment.Contains("/")),
			`Each string path-segment must be a plain prop-name. (ie. contain no "/" separators) @segments(${pathSegments})`);
	}*/
	
	let selectedData = DeepGet(store.getState(), rootStorePathSegments.concat(pathSegments as any));
	return selectedData;
}
function ConvertPathGetterFuncToPropChain(pathGetterFunc: Function) {
	let pathStr = pathGetterFunc.toString().match(/return a\.(.+?);/)[1] as string;
	Assert(!pathStr.includes("["), `State-getter-func cannot contain bracket-based property-access.\n\n${""
		}For variable inclusion, use multiple segments as in "State("main", "mapViews", mapID)".`);
	//let result = pathStr.replace(/\./g, "/");
	let result = pathStr.split(".");
	return result;
}

//export function DeepGet(obj, path, resultIfNullOrUndefined = null, resultIfUndefined_override = undefined) {
export function DeepGet<T>(obj, pathOrPathNodes: string | (string | number)[], resultIfNull: T = null, sepChar = "/"): T {
	//let pathNodes = path.SplitByAny("\\.", "\\/");
	let pathNodes = pathOrPathNodes instanceof Array ? pathOrPathNodes : pathOrPathNodes.split(sepChar);
	let result = obj;
	for (let pathNode of pathNodes) {
		if (result == null) break;
		result = result[pathNode];
	}
	/*if (result === undefined)
		return arguments.length == 4 ? resultIfUndefined_override : resultIfNullOrUndefined;
	if (result == null)
		return resultIfNullOrUndefined;*/
	if (result == null)
		return resultIfNull;
	return result;
}

//declare global { function Clone(obj): any; } G({Clone});
export function Clone(obj) {
	return FromJSON(ToJSON(obj));
}

export function GetErrorMessagesUnderElement(element) {
	return element.querySelectorAll(":invalid").ToList().map(node=>node.validationMessage || `Invalid value.`);
}

export var emptyArray = [];