import {Action} from "../Utils/Action";
import {combineReducers} from "redux";
import { GetSubforum, GetThread } from "./firebase/forum";
import {Thread} from "./firebase/forum/@Thread";
import {Subforum} from "./firebase/forum/@Subforum";
import { Manager } from "../index";
import { State } from "../General";

export class ACTSubforumSelect extends Action<{id: number}> {}
export class ACTThreadSelect extends Action<{id: number}> {}

export class Forum {
	selectedSubforumID: number;
	selectedThreadID: number;
}

export const ForumReducer = combineReducers({
	selectedSubforumID: (state = null, action)=> {
		if (action.Is(ACTSubforumSelect)) return action.payload.id;
		return state;
	},
	selectedThreadID: (state = null, action)=> {
		if (action.Is(ACTThreadSelect)) return action.payload.id;
		return state;
	},
}) as any;

export function GetSelectedSubforumID(): number {
	return State("selectedSubforumID");
}
export function GetSelectedSubforum(): Subforum {
	let selectedID = GetSelectedSubforumID();
	return GetSubforum(selectedID);
}

export function GetSelectedThreadID(): number {
	return State("selectedThreadID");
}
export function GetSelectedThread(): Thread {
	let selectedID = GetSelectedThreadID();
	return GetThread(selectedID);
}