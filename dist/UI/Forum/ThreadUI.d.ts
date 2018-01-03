import { BaseComponent } from "react-vextensions";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { Post } from "../../Store/firebase/forum/@Post";
import { PermissionGroupSet } from "../../Manager";
export declare type ThreadUI_Props = {
    thread: Thread;
    subNavBarWidth?: number;
} & Partial<{
    permissions: PermissionGroupSet;
    posts: Post[];
}>;
export declare class ThreadUI extends BaseComponent<ThreadUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
