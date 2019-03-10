import { BaseComponent } from "react-vextensions";
import { ThreadDetailsUI } from "./Thread/ThreadDetailsUI";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { Post } from "../../Store/firebase/forum/@Post";
declare const ThreadUI_base: new (..._: any[]) => BaseComponent<{
    thread: Thread;
    subNavBarWidth?: number;
} & Partial<{
    posts: Post[];
}>, {}>;
export declare class ThreadUI extends ThreadUI_base {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
declare const DetailsDropdown_base: new (..._: any[]) => BaseComponent<{
    thread: Thread;
} & Partial<{
    posts: Post[];
}>, {
    dataError: string;
}>;
export declare class DetailsDropdown extends DetailsDropdown_base {
    detailsUI: ThreadDetailsUI;
    render(): JSX.Element;
}
export {};
