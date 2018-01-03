import { Section } from "./forum/@Section";
import { Thread } from "./forum/@Thread";
import { Post } from "./forum/@Post";
import { Subforum } from "./forum/@Subforum";
export interface ForumData {
    general: ForumData_General;
    sections: {
        [key: number]: Section;
    };
    threads: {
        [key: number]: Thread;
    };
    posts: {
        [key: number]: Post;
    };
}
export interface ForumData_General {
    lastSectionID: number;
    lastSubforumID: number;
    lastThreadID: number;
    lastPostID: number;
    sectionOrder: number[];
}
export declare function GetSection(id: number): Section;
export declare function GetSections(): Section[];
export declare function GetSubforum(id: number): Subforum;
export declare function GetSubforums(): Subforum[];
export declare function GetSectionSubforums(section: Section): Subforum[];
export declare function GetThread(id: number): Thread;
export declare function GetThreads(): Thread[];
export declare function GetSubforumThreads(subforum: Subforum): Thread[];
export declare function GetPost(id: number): Post;
export declare function GetPosts(): Post[];
export declare function GetThreadPosts(thread: Thread): Post[];
