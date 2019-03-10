import { BaseComponent } from "react-vextensions";
import { Thread } from "../../../Store/firebase/forum/@Thread";
export declare type ThreadDetailsUI_Props = {
    baseData: Thread;
    forNew: boolean;
    enabled?: boolean;
    style?: any;
    onChange?: (newData: Thread) => void;
} & Partial<{
    creator: User;
}>;
export declare class ThreadDetailsUI extends BaseComponent<ThreadDetailsUI_Props, {
    newData: Thread;
}> {
    ComponentWillMountOrReceiveProps(props: any, forMount: any): void;
    render(): JSX.Element;
    GetValidationError(): any;
    GetNewData(): Thread;
}
