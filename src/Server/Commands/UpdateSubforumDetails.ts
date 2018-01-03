import {Assert} from "js-vextensions";
import {Command} from "../Command";
import {Subforum_nameFormat, Subforum} from "../../Store/firebase/forum/@Subforum";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";

AddSchema({
	properties: {
		subforumID: {type: "number"},
		subforumUpdates: Schema({
			properties: {
				name: {type: "string", pattern: Subforum_nameFormat},
			},
		}),
	},
	required: ["subforumID", "subforumUpdates"],
}, "UpdateSubforumDetails_payload");

//@UserEdit
export class UpdateSubforumDetails extends Command<{subforumID: number, subforumUpdates: Partial<Subforum>}> {
	Validate_Early() {
		AssertValidate("UpdateSubforumDetails_payload", this.payload, `Payload invalid`);
	}

	oldData: Subforum;
	newData: Subforum;
	async Prepare() {
		let {subforumID, subforumUpdates} = this.payload;
		this.oldData = await GetDataAsync({addHelpers: false}, "subforums", subforumID) as Subforum;
		this.newData = {...this.oldData, ...subforumUpdates};
	}
	async Validate() {
		AssertValidate("Subforum", this.newData, `New subforum-data invalid`);
	}
	
	GetDBUpdates() {
		let {subforumID, subforumUpdates} = this.payload;
		let updates = {};
		updates[`subforums/${subforumID}`] = this.newData;
		return updates;
	}
}