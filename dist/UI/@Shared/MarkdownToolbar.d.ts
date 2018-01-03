import { BaseComponent } from "react-vextensions";
export declare class MarkdownToolbar extends BaseComponent<{
    enabled?: boolean;
    editor: () => any;
    excludeCommands?: string[];
}, {}> {
    render(): JSX.Element;
}
