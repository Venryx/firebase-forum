import { Command } from "../Command";
import { Section } from "../../Store/firebase/forum/@Section";
export default class AddSection extends Command<{
    section: Section;
}> {
    sectionID: number;
    oldSectionOrder: number[];
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
