import { Action } from "../Utils/Action";
import { Thread } from "./firebase/forum/@Thread";
import { Subforum } from "./firebase/forum/@Subforum";
export declare class ACTSubforumSelect extends Action<{
    id: number;
}> {
}
export declare class ACTThreadSelect extends Action<{
    id: number;
}> {
}
export declare class Forum {
    selectedSubforumID: number;
    selectedThreadID: number;
}
export declare const ForumReducer: any;
export declare function GetSelectedSubforumID(): number;
export declare function GetSelectedSubforum(): Subforum;
export declare function GetSelectedThreadID(): number;
export declare function GetSelectedThread(): Thread;
