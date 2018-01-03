/// <reference types="firebase" />
export declare function DBPath(path?: string, inVersionRoot?: boolean): string;
export declare function DBPathSegments(pathSegments: (string | number)[], inVersionRoot?: boolean): (string | number)[];
export declare function SlicePath(path: string, removeFromEndCount: number, ...itemsToAdd: string[]): string;
export declare type FirebaseApp = Firebase & {
    _;
    helpers: {
        ref(path: string): FirebaseQuery;
        set;
        uniqueSet;
        push;
        remove;
        update;
        login(options: {
            provider: "email?" | "google" | "facebook" | "twitter" | "github" | "anonymous?" | "?";
            type: "popup" | "?";
        });
        logout();
        uploadFile;
        uploadFiles;
        deleteFile;
        createUser;
        resetPassword;
        watchEvent;
        unWatchEvent;
        storage(): FirebaseStatic;
        DBRef(path?: string, inVersionRoot?: boolean): FirebaseQuery;
    };
};
export declare function ProcessDBData(data: any, standardizeForm: boolean, addHelpers: boolean, rootKey: string): any;
/** Note: this mutates the original object. */
export declare function RemoveHelpers(data: any): any;
export declare function GetUpdates(oldData: any, newData: any, useNullInsteadOfUndefined?: boolean): any;
export declare class GetData_Options {
    makeRequest?: boolean;
    useUndefinedForInProgress?: boolean;
    queries?: any;
}
/** Begins request to get data at the given path in the Firebase database.
 *
 * Returns undefined when the current-data for the path is null/non-existent, but a request is in-progress.
 * Returns null when we've completed the request, and there is no data at that path. */
export declare function GetData(...pathSegments: (string | number)[]): any;
export declare function GetData(options: GetData_Options, ...pathSegments: (string | number)[]): any;
export declare class GetDataAsync_Options {
    addHelpers?: boolean;
}
export declare function GetDataAsync(...pathSegments: (string | number)[]): any;
export declare function GetDataAsync(options: GetDataAsync_Options, ...pathSegments: (string | number)[]): any;
/**
 * Usage: await GetAsync(()=>GetNode(123))
 * It has the same processing as in Connect(), except callable using async/await.
 * It basically makes a pretend component -- connecting to firebase, and resolving the promise once:
 * It re-calls the db-getter func (after the last generation's requested-path-data was all received), and finds that no new paths are requested.
 */
export declare function GetAsync<T>(dbGetterFunc: () => T, statsLogger?: ({requestedPaths: string}) => void): Promise<T>;
