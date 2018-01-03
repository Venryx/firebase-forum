import {Assert} from "js-vextensions";
import {Command} from "../Command";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";
import {Subforum} from "../../Store/firebase/forum/@Subforum";

//@UserEdit
export class AddSubforum extends Command<{sectionID: number, subforum: Subforum}> {
	subforumID: number;
	oldSubforumOrder: number[];
	async Prepare() {
		let {sectionID, subforum} = this.payload;
		let firebase = store.firebase.helpers;

		let lastSubforumID = await GetDataAsync("forum", "general", "lastSubforumID") as number;
		this.subforumID = lastSubforumID + 1;
		subforum.section = sectionID;

		this.oldSubforumOrder = await GetDataAsync("forum", "sections", sectionID, "subforumOrder") || [];

		this.returnData = this.subforumID;
	}
	async Validate() {
		let {subforum} = this.payload;
		AssertValidate(`Subforum`, subforum, `Subforum invalid`);
	}
	
	GetDBUpdates() {
		let {sectionID, subforum} = this.payload;
		let updates = {};
		updates["forum/general/lastSubforumID"] = this.subforumID;
		updates[`forum/sections/${sectionID}/subforumOrder`] = this.oldSubforumOrder.concat(this.subforumID);
		updates[`forum/subforums/${this.subforumID}`] = subforum;
		return updates;
	}
}