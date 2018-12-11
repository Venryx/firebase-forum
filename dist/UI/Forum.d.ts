import { BaseComponent } from "react-vextensions";
import { Section } from "../Store/firebase/forum/@Section";
import { Subforum } from "../Store/firebase/forum/@Subforum";
import { Thread } from "../Store/firebase/forum/@Thread";
import { Post } from "../Store/firebase/forum/@Post";
export declare const columnWidths: number[];
declare const ForumUI_base: new (..._: any[]) => BaseComponent<Partial<{
    _: any;
    sections: Section[];
    selectedSubforum: Subforum;
    selectedThread: Thread;
}>, {}>;
export declare class ForumUI extends ForumUI_base {
    render(): JSX.Element;
}
declare const SectionUI_base: new (..._: any[]) => BaseComponent<{
    section: Section;
} & Partial<{
    subforums: Subforum[];
}>, {}>;
export declare class SectionUI extends SectionUI_base {
    render(): JSX.Element;
}
declare const SubforumEntryUI_base: new (..._: any[]) => BaseComponent<{
    index: number;
    last: boolean;
    subforum: Subforum;
} & Partial<{
    threads: Thread[];
    lastPost: Post;
    lastPostThread: Thread;
    lastPostCreator: any;
}>, {}>;
export declare class SubforumEntryUI extends SubforumEntryUI_base {
    render(): JSX.Element;
}
