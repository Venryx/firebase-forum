import {Assert} from "js-vextensions";
import {Command} from "../Command";
import {Section} from "../../Store/firebase/forum/@Section";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";

//@UserEdit
export class AddSection extends Command<{section: Section}> {
	sectionID: number;
	oldSectionOrder: number[];
	async Prepare() {
		let {section} = this.payload;
		let firebase = store.firebase.helpers;

		let lastSectionID = await GetDataAsync("general", "lastSectionID") as number;
		this.sectionID = lastSectionID + 1;

		this.oldSectionOrder = await GetDataAsync("general", "sectionOrder") || [];

		this.returnData = this.sectionID;
	}
	async Validate() {
		let {section} = this.payload;
		AssertValidate(`Section`, section, `Section invalid`);
	}
	
	GetDBUpdates() {
		let {section} = this.payload;

		let updates = {};
		// add section
		updates["general/lastSectionID"] = this.sectionID;
		updates["general/sectionOrder"] = this.oldSectionOrder.concat(this.sectionID);
		updates[`sections/${this.sectionID}`] = section;

		return updates;
	}
}