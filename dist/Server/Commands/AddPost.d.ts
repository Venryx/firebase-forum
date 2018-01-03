import { Command } from "../Command";
import { Post } from "../../Store/firebase/forum/@Post";
export declare class AddPost extends Command<{
    threadID: number;
    post: Post;
}> {
    Validate_Early(): void;
    postID: number;
    thread_oldPosts: number[];
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
