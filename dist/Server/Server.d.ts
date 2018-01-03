import AJV from "ajv";
export declare const ajv: AJV_Extended;
declare global  {
    const ajv: AJV_Extended;
}
declare global  {
    function Schema(schema: any): any;
}
export declare function Schema(schema: any): any;
declare global  {
    function AddSchema(schema: any, name: string): any;
}
export declare function AddSchema(schema: any, name: string): AJV.Ajv;
export declare function GetSchemaJSON(name: string): any;
export declare function WaitTillSchemaAddedThenRun(schemaName: string, callback: () => void): void;
export declare type AJV_Extended = AJV.Ajv & {
    FullErrorsText(): string;
};
declare global  {
    function AssertValidate(schemaName: string, data: any, failureMessage: string, addDataStr?: boolean): any;
}
