import { BaseComponent } from "react-vextensions";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { Post } from "../../Store/firebase/forum/@Post";
export declare let ThreadEntryUI: typeof ThreadEntryUI_NC;
declare const ThreadEntryUI_NC_base: new (..._: any[]) => BaseComponent<{
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
export declare class ThreadEntryUI_NC extends ThreadEntryUI_NC_base {
    render(): JSX.Element;
}
