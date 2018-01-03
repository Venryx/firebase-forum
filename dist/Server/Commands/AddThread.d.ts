import { Command } from "../Command";
import { Thread } from "../../Store/firebase/forum/@Thread";
import AddPost from "./AddPost";
import { Post } from "../../Store/firebase/forum/@Post";
export default class AddThread extends Command<{
    thread: Thread;
    post: Post;
}> {
    threadID: number;
    sub_addPost: AddPost;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): any;
}
