/// <reference types="react" />
import { Section } from "../Store/firebase/forum/@Section";
import { Subforum } from "../Store/firebase/forum/@Subforum";
export declare const columnWidths: number[];
declare const ForumUI_base: (new (..._: any[]) => import("react-vextensions").BaseComponent<Partial<{
    _: any;
    sections: Section[];
    selectedSubforum: Subforum;
    selectedThread: import("..").Thread;
}>, {}, {}>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ForumUI extends ForumUI_base {
    constructor(props: any);
    render(): JSX.Element;
}
declare const SectionUI_base: (new (..._: any[]) => import("react-vextensions").BaseComponent<{
    section: Section;
} & Partial<{
    subforums: Subforum[];
}>, {}, {}>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class SectionUI extends SectionUI_base {
    render(): JSX.Element;
}
declare const SubforumEntryUI_base: (new (..._: any[]) => import("react-vextensions").BaseComponent<{
    index: number;
    last: boolean;
    subforum: Subforum;
} & Partial<{
    threads: import("..").Thread[];
    lastPost: import("..").Post;
    lastPostThread: import("..").Thread;
    lastPostCreator: any;
}>, {}, {}>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class SubforumEntryUI extends SubforumEntryUI_base {
    render(): JSX.Element;
}
export {};
