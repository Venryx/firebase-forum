import { BaseComponent } from "react-vextensions";
import { Section } from "../Store/firebase/forum/@Section";
import { Subforum } from "../Store/firebase/forum/@Subforum";
import { Thread } from "../Store/firebase/forum/@Thread";
export declare const columnWidths: number[];
export default class ForumUI extends BaseComponent<{} & Partial<{
    sections: Section[];
    selectedSubforum: Subforum;
    selectedThread: Thread;
}>, {}> {
    render(): JSX.Element;
}
