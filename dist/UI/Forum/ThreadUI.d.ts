import { BaseComponent } from "react-vextensions";
import { ThreadDetailsUI } from "./Thread/ThreadDetailsUI";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { Post } from "../../Store/firebase/forum/@Post";
export declare let ThreadUI: typeof ThreadUI_NC;
declare const ThreadUI_NC_base: new (..._: any[]) => BaseComponent<{
    thread: Thread;
    subNavBarWidth?: number;
} & Partial<{
    posts: Post[];
}>, {}>;
export declare class ThreadUI_NC extends ThreadUI_NC_base {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
export declare let DetailsDropdown: typeof DetailsDropdown_NC;
declare const DetailsDropdown_NC_base: new (..._: any[]) => BaseComponent<{
    thread: Thread;
} & Partial<{
    posts: Post[];
}>, {
    dataError: string;
}>;
export declare class DetailsDropdown_NC extends DetailsDropdown_NC_base {
    detailsUI: ThreadDetailsUI;
    render(): JSX.Element;
}
