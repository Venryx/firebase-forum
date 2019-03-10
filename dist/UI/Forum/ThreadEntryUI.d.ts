import { BaseComponent } from "react-vextensions";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { Post } from "../../Store/firebase/forum/@Post";
declare const ThreadEntryUI_base: new (..._: any[]) => BaseComponent<{
    index: number;
    last: boolean;
    thread: Thread;
} & Partial<{
    creator: any;
    posts: Post[];
    lastPost: Post;
    lastPostCreator: any;
}>, {
    editing: boolean;
    dataError: string;
}>;
export declare class ThreadEntryUI extends ThreadEntryUI_base {
    render(): JSX.Element;
}
export {};
