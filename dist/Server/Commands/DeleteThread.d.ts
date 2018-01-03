import { Command } from "../Command";
import { Post } from "../../Store/firebase/forum/@Post";
export declare class DeleteThread extends Command<{
    threadID: number;
}> {
    posts: Post[];
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
