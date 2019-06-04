export declare function DBPath(path?: string, inVersionRoot?: boolean): string;
export declare type PathSegment = string | number;
export declare function DBPathSegments(pathSegments: PathSegment[], inVersionRoot?: boolean): PathSegment[];
export declare function SlicePath(path: string, removeFromEndCount: number, ...itemsToAdd: string[]): string;
/** Note: this mutates the original object. */
export declare function RemoveHelpers(data: any): any;
export declare function GetUpdates(oldData: any, newData: any, useNullInsteadOfUndefined?: boolean): any;
export declare class GetData_Options {
    inVersionRoot?: boolean;
    makeRequest?: boolean;
    collection?: boolean;
    excludeCollections?: string[];
    useUndefinedForInProgress?: boolean;
}
export declare function GetData(...pathSegments: (string | number)[]): any;
export declare function GetData(options: GetData_Options, ...pathSegments: (string | number)[]): any;
export declare class GetDataAsync_Options {
    addHelpers?: boolean;
}
export declare function GetDataAsync(...pathSegments: (string | number)[]): any;
export declare function GetDataAsync(options: GetDataAsync_Options, ...pathSegments: (string | number)[]): any;
export declare function GetAsync<T>(dbGetterFunc: () => T, statsLogger?: ({ requestedPaths: string }: {
    requestedPaths: any;
}) => void): Promise<T>;
