import { Command } from "../Command";
import { Post } from "../../Store/firebase/forum/@Post";
export declare class DeletePost extends Command<{
    postID: number;
}> {
    oldData: Post;
    thread_oldPosts: number[];
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
