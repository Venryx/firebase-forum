import { BaseComponent } from "react-vextensions";
import { Section } from "../Store/firebase/forum/@Section";
import { Subforum } from "../Store/firebase/forum/@Subforum";
import { Thread } from "../Store/firebase/forum/@Thread";
import { Post } from "../Store/firebase/forum/@Post";
export declare const columnWidths: number[];
export declare let ForumUI: typeof ForumUI_NC;
declare const ForumUI_NC_base: new (..._: any[]) => BaseComponent<Partial<{
    _: any;
    sections: Section[];
    selectedSubforum: Subforum;
    selectedThread: Thread;
}>, {}>;
export declare class ForumUI_NC extends ForumUI_NC_base {
    render(): JSX.Element;
}
export declare let SectionUI: typeof SectionUI_NC;
declare const SectionUI_NC_base: new (..._: any[]) => BaseComponent<{
    section: Section;
} & Partial<{
    subforums: Subforum[];
}>, {}>;
export declare class SectionUI_NC extends SectionUI_NC_base {
    render(): JSX.Element;
}
export declare let SubforumEntryUI: typeof SubforumEntryUI_NC;
declare const SubforumEntryUI_NC_base: new (..._: any[]) => BaseComponent<{
    index: number;
    last: boolean;
    subforum: Subforum;
} & Partial<{
    threads: Thread[];
    lastPost: Post;
    lastPostThread: Thread;
    lastPostCreator: any;
}>, {}>;
export declare class SubforumEntryUI_NC extends SubforumEntryUI_NC_base {
    render(): JSX.Element;
}
