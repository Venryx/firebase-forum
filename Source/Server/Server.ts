import AJV from "ajv";
import AJVKeywords from "ajv-keywords";
import {ToJSON, IsString, Assert, E} from "js-vextensions";

export const ajv = AJVKeywords(new AJV()) as AJV_Extended;

export function Schema(schema) {
	schema = E({additionalProperties: false}, schema);
	return schema;
}

let schemaJSON = {};
export function AddSchema(schema, name: string) {
	schema = Schema(schema);
	schemaJSON[name] = schema;
	ajv.removeSchema(name); // for hot-reloading
	let result = ajv.addSchema(schema, name);

	if (schemaAddListeners[name]) {
		for (let listener of schemaAddListeners[name]) {
			listener();
		}
		delete schemaAddListeners[name];
	}

	return result;
}

export function GetSchemaJSON(name: string) {
	return schemaJSON[name];
}

var schemaAddListeners = {};
export function WaitTillSchemaAddedThenRun(schemaName: string, callback: ()=>void) {
	// if schema is already added, run right away
	if (ajv.getSchema(schemaName)) {
		callback();
		return;
	}
	schemaAddListeners[schemaName] = (schemaAddListeners[schemaName] || []).concat(callback);
}

export type AJV_Extended = AJV.Ajv & {
	//AddSchema(schema, name: string): void;
	FullErrorsText(): string;
};
/*AJV.prototype.AddSchema = function(this: AJV_Extended, schema, name: string) {
	return `${this.errorsText()} (${ToJSON(this.errors)})`;
};*/
AJV.prototype.FullErrorsText = function(this: AJV_Extended) {
	return `${this.errorsText()}

Details: ${ToJSON(this.errors, null, 3)}
`;
};

// validation
// ==========

export function AssertValidate(schemaName: string, data, failureMessageOrGetter: string | ((errorsText: string)=>string), addErrorsText = true, addDataStr = true) {
	let validationResult = ajv.validate(schemaName, data);
	if (validationResult == true) return;

	let errorsText = ajv.FullErrorsText();
	let failureMessage = IsString(failureMessageOrGetter) ? failureMessageOrGetter : failureMessageOrGetter(errorsText);
	if (addErrorsText) {
		failureMessage += `: ${errorsText}`;
	}
	if (addDataStr) {
		failureMessage += `\nData: ${ToJSON(data, null, 3)}`;
	}
	failureMessage += "\n";

	Assert(validationResult, failureMessage);
}