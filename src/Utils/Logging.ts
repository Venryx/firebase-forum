import { logTypes } from "../Manager";

export class LogTypes {
	commands = false;
}

export function ShouldLog(shouldLogFunc: (logTypes: LogTypes)=>boolean) {
	return shouldLogFunc(logTypes || {} as any);
}
export function MaybeLog(shouldLogFunc: (logTypes: LogTypes)=>boolean, logMessageGetter: ()=>string) {
	if (!ShouldLog(shouldLogFunc)) return;
	console.log(logMessageGetter());
}