import {Assert} from "js-vextensions";
import {Command, MergeDBUpdates} from "../Command";
import {Subforum} from "../../Store/firebase/forum/@Subforum";
import {GetThreadPosts, GetThread} from "../../Store/firebase/forum";
import { GetAsync } from "../../Utils/Database/DatabaseHelpers";
import {Post} from "../../Store/firebase/forum/@Post";

//@UserEdit
export class DeleteThread extends Command<{threadID: number}> {
	posts: Post[];
	async Prepare() {
		let {threadID} = this.payload;
		let thread = await GetAsync(()=>GetThread(threadID))
		this.posts = await GetAsync(()=>GetThreadPosts(thread));
	}
	async Validate() {
		if (this.posts.filter(a=>a.creator != this.userInfo.id && a.text).length) {
			throw new Error(`Threads with responses by other people cannot be deleted.`);
		}
	}

	GetDBUpdates() {
		let {threadID} = this.payload;
		let updates = {};
		updates[`threads/${threadID}`] = null;
		for (let post of this.posts) {
			updates[`posts/${post._id}`] = null;
		}
		return updates;
	}
}