import { Command } from "../Command";
import { Subforum } from "../../Store/firebase/forum/@Subforum";
export declare class AddSubforum extends Command<{
    sectionID: number;
    subforum: Subforum;
}> {
    subforumID: number;
    oldSubforumOrder: number[];
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
