import React from "react";
import {BaseComponent, GetDOM} from "react-vextensions";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {Div, Pre} from "react-vcomponents";
import {TextInput} from "react-vcomponents";
import {Button} from "react-vcomponents";
import {Component} from "react";
import {Select} from "react-vcomponents";
import {Post} from "../../../Store/firebase/forum/@Post";
import {GetErrorMessagesUnderElement, Clone, E} from "js-vextensions";
import {MarkdownEditor, MarkdownToolbar} from "react-vmarkdown";
import {Manager, manager} from "../../../Manager";

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
			<Column>
				<Column>
					{enabled &&
						<MarkdownToolbar editor={()=>this.refs.editor}>
							<manager.Link to="https://guides.github.com/features/mastering-markdown" style={{marginLeft: 10}}>How to add links, images, etc.</manager.Link>
						</MarkdownToolbar>}
					<MarkdownEditor ref="editor" toolbar={false} value={newData.text || ""} onChange={val=>Change(newData.text = val)}
						options={E({
							//scrollbarStyle: "overlay",
							lineWrapping: true,
							readOnly: !enabled,
							placeholder: "Write your reply..."
						}, options)}/>
				</Column>
			</Column>
		);
	}

	GetValidationError() {
		return GetErrorMessagesUnderElement(GetDOM(this))[0];
	}
	GetNewData() {
		let {newData} = this.state;
		return Clone(newData);
	}
}