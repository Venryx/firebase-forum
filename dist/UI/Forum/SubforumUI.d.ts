import { BaseComponent } from "react-vextensions";
import { Subforum } from "../../Store/firebase/forum/@Subforum";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { PermissionGroupSet } from "../../Manager";
export declare const columnWidths: number[];
export declare type SubforumUI_Props = {
    subforum: Subforum;
    subNavBarWidth?: number;
} & Partial<{
    permissions: PermissionGroupSet;
    threads: Thread[];
}>;
export declare class SubforumUI extends BaseComponent<SubforumUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
