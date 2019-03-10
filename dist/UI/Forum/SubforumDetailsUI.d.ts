import { BaseComponent } from "react-vextensions";
import { Subforum } from "../../Store/firebase/forum/@Subforum";
export declare type SubforumDetailsUI_Props = {
    baseData: Subforum;
    forNew: boolean;
    enabled?: boolean;
    style?: any;
    onChange?: (newData: Subforum) => void;
};
export declare class SubforumDetailsUI extends BaseComponent<SubforumDetailsUI_Props, {
    newData: Subforum;
}> {
    ComponentWillMountOrReceiveProps(props: any, forMount: any): void;
    render(): JSX.Element;
    GetValidationError(): any;
    GetNewData(): Subforum;
}
