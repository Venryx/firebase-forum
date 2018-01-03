import {Assert} from "js-vextensions";
import {Command} from "../Command";
import {Post} from "../../Store/firebase/forum/@Post";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";

//@UserEdit
export class AddPost extends Command<{threadID: number, post: Post}> {
	Validate_Early() {
		let {threadID, post} = this.payload;
	}

	postID: number;
	thread_oldPosts: number[];
	async Prepare() {
		let {threadID, post} = this.payload;
		let firebase = store.firebase.helpers;

		let lastPostID = await GetDataAsync("general", "lastPostID") as number;
		this.postID = lastPostID + 1;
		post.thread = threadID;
		post.creator = this.userInfo.id;
		post.createdAt = Date.now();

		this.thread_oldPosts = await GetDataAsync("threads", threadID, "posts") || [];

		this.returnData = this.postID;
	}
	async Validate() {
		let {post} = this.payload;
		AssertValidate(`Post`, post, `Post invalid`);
	}
	
	GetDBUpdates() {
		let {threadID, post} = this.payload;

		let updates = {};
		// add post
		updates["general/lastPostID"] = this.postID;
		updates[`posts/${this.postID}`] = post;

		// add to thread
		updates[`threads/${threadID}/posts`] = this.thread_oldPosts.concat(this.postID);

		return updates;
	}
}