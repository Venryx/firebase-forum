export declare class LogTypes {
    commands: boolean;
}
export declare function ShouldLog(shouldLogFunc: (logTypes: LogTypes) => boolean): boolean;
export declare function MaybeLog(shouldLogFunc: (logTypes: LogTypes) => boolean, logMessageGetter: () => string): void;
