import {Assert} from "js-vextensions";
import {Command, MergeDBUpdates} from "../Command";
import {Subforum} from "../../Store/firebase/forum/@Subforum";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";

//@UserEdit
export default class DeleteSubforum extends Command<{subforumID: number}> {
	oldData: Subforum;
	section_oldSubforumOrder: number[];
	async Prepare() {
		let {subforumID} = this.payload;
		this.oldData = await GetDataAsync({addHelpers: false}, "forum", "subforums", subforumID) as Subforum;
		this.section_oldSubforumOrder = await GetDataAsync("forum", "sections", this.oldData.section, "subforumOrder") as number[];
	}
	async Validate() {}

	GetDBUpdates() {
		let {subforumID} = this.payload;
		let updates = {};
		updates[`forum/subforums/${subforumID}`] = null;
		updates[`forum/sections/${this.oldData.section}/subforumOrder`] = this.section_oldSubforumOrder.Except(subforumID);
		return updates;
	}
}