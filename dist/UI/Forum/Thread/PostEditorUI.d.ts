import { BaseComponent } from "react-vextensions";
import { Post } from "../../../Store/firebase/forum/@Post";
export declare class PostEditorUI extends BaseComponent<{
    forNew?: boolean;
    enabled?: boolean;
    baseData: Post;
    options?: any;
    onChange?: (newData: Post, comp: PostEditorUI) => void;
}, {
    newData: Post;
}> {
    static defaultProps: {
        enabled: boolean;
    };
    ComponentWillMountOrReceiveProps(props: any, forMount: any): void;
    render(): JSX.Element;
    GetValidationError(): any;
    GetNewData(): any;
}
