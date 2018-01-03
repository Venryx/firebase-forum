import {Assert} from "js-vextensions";
import {Command, MergeDBUpdates} from "../Command";
import {Subforum} from "../../Store/firebase/forum/@Subforum";
import {GetThreadPosts, GetThread, GetPost} from "../../Store/firebase/forum";
import {Post} from "../../Store/firebase/forum/@Post";
import { GetAsync } from "../../Utils/Database/DatabaseHelpers";

//@UserEdit
export class DeletePost extends Command<{postID: number}> {
	oldData: Post;
	thread_oldPosts: number[];
	//timeSinceCreation: number;
	async Prepare() {
		let {postID} = this.payload;
		this.oldData = await GetAsync(()=>GetPost(postID));
		let thread = await GetAsync(()=>GetThread(this.oldData.thread));
		this.thread_oldPosts = thread.posts;
		//this.timeSinceCreation = Date.now() - this.oldData.createdAt;
	}
	async Validate() {}

	GetDBUpdates() {
		let {postID} = this.payload;
		let updates = {};
		//if (this.timeSinceCreation < 20 * 60 * 1000) { // if younger than 20 minutes, allow complete deletion
		if (this.thread_oldPosts.Last() == postID) { // if there are no later responses, allow complete deletion
			updates[`threads/${this.oldData.thread}/posts`] = this.thread_oldPosts.Except(postID);
			updates[`posts/${postID}`] = null;
		} else {
			updates[`posts/${postID}/text`] = null;
			updates[`posts/${postID}/editedAt`] = Date.now();
		}
		return updates;
	}
}