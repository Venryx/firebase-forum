import { Command } from "../Command";
import { Subforum } from "../../Store/firebase/forum/@Subforum";
export declare class DeleteSubforum extends Command<{
    subforumID: number;
}> {
    oldData: Subforum;
    section_oldSubforumOrder: number[];
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
