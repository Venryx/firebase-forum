/// <reference types="react" />
import React from 'react';
import { BaseComponent } from "react-vextensions";
import { VURL } from "js-vextensions";
export declare type Link_Props = {
    onClick?;
    style?;
    text?: string;
    to?: string;
    target?: string;
    replace?: boolean;
    actions?: (dispatch: Function) => void;
} & React.HTMLProps<HTMLAnchorElement>;
export default class Link extends BaseComponent<Link_Props, {}> {
    handleClick(event: any): void;
    render(): JSX.Element;
}
export declare function GetCurrentURL(fromAddressBar?: boolean): VURL;
