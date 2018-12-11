import { BaseComponent } from "react-vextensions";
import { Subforum } from "../../Store/firebase/forum/@Subforum";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { PermissionGroupSet } from "../../Manager";
export declare const columnWidths: number[];
export declare let SubforumUI: typeof SubforumUI_NC;
declare const SubforumUI_NC_base: new (..._: any[]) => BaseComponent<{
    subforum: Subforum;
    subNavBarWidth?: number;
} & Partial<{
    permissions: PermissionGroupSet;
    threads: Thread[];
}>, {}>;
export declare class SubforumUI_NC extends SubforumUI_NC_base {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
