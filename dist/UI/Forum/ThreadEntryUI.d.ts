import { BaseComponent } from "react-vextensions";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { Post } from "../../Store/firebase/forum/@Post";
export declare type ThreadEntryUI_Props = {
    index: number;
    last: boolean;
    thread: Thread;
} & Partial<{
    creator: User;
    posts: Post[];
    lastPost: Post;
    lastPostCreator: User;
}>;
export declare class ThreadEntryUI extends BaseComponent<ThreadEntryUI_Props, {}> {
    render(): JSX.Element;
}
