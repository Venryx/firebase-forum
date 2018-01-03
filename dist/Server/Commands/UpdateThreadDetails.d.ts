import { Command } from "../Command";
import { Thread } from "../../Store/firebase/forum/@Thread";
export declare class UpdateThreadDetails extends Command<{
    threadID: number;
    threadUpdates: Partial<Thread>;
}> {
    Validate_Early(): void;
    oldData: Thread;
    newData: Thread;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
