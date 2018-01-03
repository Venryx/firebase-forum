export declare class CommandUserInfo {
    id: string;
}
export declare abstract class Command<Payload> {
    constructor(payload: Payload);
    userInfo: CommandUserInfo;
    type: string;
    payload: Payload;
    returnData: any;
    /** [sync] Validates the payload data. (ie. the validation that doesn't require accessing the database) */
    Validate_Early(): void;
    /** [async] Transforms the payload data, combines it with database data, and so on, in preparation for the database-updates-map construction. */
    abstract Prepare(): Promise<void>;
    /** [async] Validates the prepared data, mostly using ajv shape-validation. */
    abstract Validate(): Promise<void>;
    /** [sync] Retrieves the actual database updates that are to be made. (so we can do it in one atomic call) */
    abstract GetDBUpdates(): {};
    /** [async] Validates the data, prepares it, and executes it -- thus applying it into the database. */
    Run(): Promise<any>;
}
export declare function MergeDBUpdates(baseUpdatesMap: any, updatesToMergeMap: any): {};
