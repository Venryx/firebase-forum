import React from 'react';
import { PropTypes } from "react";
import {BaseComponent} from "react-vextensions";
import {VURL, GetCurrentURLString} from "js-vextensions";
import {Connect} from "../../Utils/Database/FirebaseConnect";
import {Manager} from "../../Manager";
import {State} from "../../General";

/*@Radium
export class Link extends BaseComponent<{to, target?: string, replace?: boolean, style?, onClick?}, {}> {
	render() {
		let {to, style, onClick, children} = this.props;
		return <LinkInner to={to} style={style} onClick={onClick}>{children}</LinkInner>;
	}
}*/

function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export type Link_Props = {
	onClick?, style?,
	text?: string, to?: string, target?: string, replace?: boolean, // url-based
	actions?: (dispatch: Function)=>void, //updateURLOnActions?: boolean, // action-based
} & React.HTMLProps<HTMLAnchorElement>;
//@Connect((state, {to, actions, updateURLOnActions}: Props)=> {
@Connect((state, {to, actions}: Link_Props)=> {
	if (actions) {
		let actionsToDispatch = [];
		function dispatch(action) {
			actionsToDispatch.push(action);
		}
		actions(dispatch);

		let newURL = Manager.GetNewURL(actionsToDispatch);

		to = newURL.toString();
	}
	return {
		//oldLocation: updateURLOnActions ? State(a=>a.router.location) : null,
		to,
	};
})
export class Link extends BaseComponent<Link_Props, {}> {
	handleClick(event) {
		let {onClick, to, target, replace: replaceURL, actions} = this.props;
		if (onClick) onClick(event);

		if (event.defaultPrevented) return; // onClick prevented default
		if (event.button !== 0) return; // ignore right clicks
		if (isModifiedEvent(event)) return; // ignore clicks with modifier keys

		if (actions) {
			event.preventDefault();
			actions(store.dispatch); // apply actions
		} else {
			let isExternal = VURL.Parse(to, true).domain != GetCurrentURL().domain;
			if (isExternal || target) return; // let browser handle external links, and "target=_blank"

			event.preventDefault();
			store.dispatch(replaceURL ? Manager.router_replace(to) : Manager.router_push(to));
		}
	}

	render() {
		let {text, to, target, actions, children, ...rest} = this.props // eslint-disable-line no-unused-vars
		//const href = this.context.router.history.createHref(typeof to === 'string' ? {pathname: to} : to)
		let isExternal = VURL.Parse(to, true).domain != GetCurrentURL().domain;
		if (isExternal && target === undefined) {
			target = "_blank";
		}

		if (to) {
			return (
				<a {...rest} onClick={this.handleClick} href={to} target={target}>
					{text}
					{children}
				</a>
			);
		}
	}

	// add proxy, since using Radium
	/*setState(newState, callback?) {
		return this.SetState(newState, callback);
	}*/
}
//Link.prototype.setState = function(newState, callback?) { return this.SetState(newState, callback); }; // add proxy, since using Radium

export function GetCurrentURL(fromAddressBar = false) {
	//return fromAddressBar ? VURL.Parse(GetCurrentURLString()) : VURL.FromState(State("router"));
	return fromAddressBar ? VURL.Parse(GetCurrentURLString()) : VURL.FromState(State("router"));
}