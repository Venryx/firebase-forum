import AJV from "ajv";
export declare const ajv: AJV_Extended;
export declare function Schema(schema: any): any;
export declare function AddSchema(schema: any, name: string): AJV.Ajv;
export declare function GetSchemaJSON(name: string): any;
export declare function WaitTillSchemaAddedThenRun(schemaName: string, callback: () => void): void;
export declare type AJV_Extended = AJV.Ajv & {
    FullErrorsText(): string;
};
export declare function AssertValidate(schemaName: string, data: any, failureMessageOrGetter: string | ((errorsText: string) => string), addErrorsText?: boolean, addDataStr?: boolean): void;
