import {AddSchema} from "../../../Server/Server";
export class Subforum {
	constructor(initialData: Partial<Subforum>) {
		Object.assign(this, initialData);
	}

	_id: number;
	name: string;
	section: number;
}

export const Subforum_nameFormat = `^[a-zA-Z0-9 ,\\-()\\/]+$`;
AddSchema({
	properties: {
		name: {type: "string", pattern: Subforum_nameFormat},
		section: {type: "number"},
	},
	required: ["name", "section"],
}, "Subforum");