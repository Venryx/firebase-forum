import { BaseComponent } from "react-vextensions";
import { PostEditorUI } from "./PostEditorUI";
import { Thread } from "../../../Store/firebase/forum/@Thread";
import { Post } from "../../../Store/firebase/forum/@Post";
export declare type PostUI_Props = {
    index: number;
    thread: Thread;
    post: Post;
} & Partial<{
    creator: User;
}>;
export declare class PostUI extends BaseComponent<PostUI_Props, {
    editing: boolean;
    dataError: string;
}> {
    postEditorUI: PostEditorUI;
    render(): JSX.Element;
}
