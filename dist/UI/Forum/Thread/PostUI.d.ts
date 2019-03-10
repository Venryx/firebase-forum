import { BaseComponent } from "react-vextensions";
import { PostEditorUI } from "./PostEditorUI";
import { Thread } from "../../../Store/firebase/forum/@Thread";
import { Post } from "../../../Store/firebase/forum/@Post";
declare const PostUI_base: new (..._: any[]) => BaseComponent<{
    index: number;
    thread: Thread;
    post: Post;
} & Partial<{
    creator: any;
}>, {
    editing: boolean;
    dataError: string;
}>;
export declare class PostUI extends PostUI_base {
    postEditorUI: PostEditorUI;
    render(): JSX.Element;
}
export {};
