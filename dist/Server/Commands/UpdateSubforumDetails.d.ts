import { Command } from "../Command";
import { Subforum } from "../../Store/firebase/forum/@Subforum";
export declare class UpdateSubforumDetails extends Command<{
    subforumID: number;
    subforumUpdates: Partial<Subforum>;
}> {
    Validate_Early(): void;
    oldData: Subforum;
    newData: Subforum;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
