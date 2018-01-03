import { Command } from "../Command";
import { Post } from "../../Store/firebase/forum/@Post";
export declare class UpdatePost extends Command<{
    postID: number;
    postUpdates: Partial<Post>;
}> {
    Validate_Early(): void;
    oldData: Post;
    newData: Post;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
