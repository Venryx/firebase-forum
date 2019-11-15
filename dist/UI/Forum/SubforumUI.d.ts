/// <reference types="react" />
import { BaseComponent } from "react-vextensions";
import { Subforum } from "../../Store/firebase/forum/@Subforum";
import { Thread } from "../../Store/firebase/forum/@Thread";
import { PermissionGroupSet } from "../../Manager";
export declare const columnWidths: number[];
declare const SubforumUI_base: (new (..._: any[]) => BaseComponent<{
    subforum: Subforum;
    subNavBarWidth?: number;
} & Partial<{
    permissions: PermissionGroupSet;
    threads: Thread[];
}>, {}, {}>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class SubforumUI extends SubforumUI_base {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
export {};
