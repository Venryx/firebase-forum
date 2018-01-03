import { RootState } from "../../General";
export declare function Connect<T, P>(innerMapStateToPropsFunc: (state: RootState, props: P) => any): any;
export declare function Connect<T, P>(mapStateToProps_inner_getter: () => (state: RootState, props: P) => any): any;
/** This only adds paths to a "request list". Connect() is in charge of making the actual db requests. */
export declare function RequestPath(path: string): void;
/** This only adds paths to a "request list". Connect() is in charge of making the actual db requests. */
export declare function RequestPaths(paths: string[]): void;
export declare function ClearRequestedPaths(): void;
export declare function GetRequestedPaths(): string[];
export declare function OnAccessPath(path: string): void;
export declare function ClearAccessedPaths(): void;
export declare function GetAccessedPaths(): string[];
