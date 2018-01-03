import React from "react";
import {BaseComponent, FindDOM} from "react-vextensions";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {Div, Pre} from "react-vcomponents";
import {TextInput} from "react-vcomponents";
import {Button} from "react-vcomponents";
import {Component} from "react";
import {Select} from "react-vcomponents";
import {Post} from "../../../Store/firebase/forum/@Post";
import {Link} from "../../@Shared/Link";
import {GetErrorMessagesUnderElement} from "js-vextensions";
import {MarkdownToolbar} from "../../@Shared/MarkdownToolbar";
import Editor from "react-md-editor";

export class PostEditorUI extends BaseComponent
		<{forNew?: boolean, enabled?: boolean, baseData: Post, options?: any, onChange?: (newData: Post, comp: PostEditorUI)=>void},
		{newData: Post}> {
	static defaultProps = {enabled: true};
	ComponentWillMountOrReceiveProps(props, forMount) {
		if (forMount || props.baseData != this.props.baseData) // if base-data changed
			this.SetState({newData: Clone(props.baseData)});
	}
	
	render() {
		let {forNew, enabled, onChange, options} = this.props;
		let {newData} = this.state;
		let Change = _=> {
			if (onChange) onChange(this.GetNewData(), this);
			this.Update();
		};

		return (
			<div style={{width: "100%"}}> {/* needed so GetInnerComp() works */}
			<Column>
				<Column>
					{enabled &&
						<MarkdownToolbar editor={()=>this.refs.editor}>
							<Link to="https://guides.github.com/features/mastering-markdown" style={{marginLeft: 10}}>How to add links, images, etc.</Link>
						</MarkdownToolbar>}
					<Editor ref="editor" value={newData.text || ""} onChange={val=>Change(newData.text = val)}
						options={E({
							scrollbarStyle: "overlay",
							lineWrapping: true,
							readOnly: !enabled,
							placeholder: "Write your reply..."
						}, options)}/>
				</Column>
			</Column>
			</div>
		);
	}

	GetValidationError() {
		return GetErrorMessagesUnderElement(FindDOM(this))[0];
	}
	GetNewData() {
		let {newData} = this.state;
		return Clone(newData);
	}
}