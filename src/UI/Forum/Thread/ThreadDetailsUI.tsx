import { GetErrorMessagesUnderElement } from "js-vextensions";
import React from "react";
import { Column, Pre, RowLR, TextInput } from "react-vcomponents";
import { BaseComponent, GetDOM } from "react-vextensions";
import { Thread } from "../../../Store/firebase/forum/@Thread";

export type ThreadDetailsUI_Props = {baseData: Thread, forNew: boolean, enabled?: boolean, style?, onChange?: (newData: Thread)=>void}
	& Partial<{creator: User}>;
export class ThreadDetailsUI extends BaseComponent<ThreadDetailsUI_Props, {newData: Thread}> {
	ComponentWillMountOrReceiveProps(props, forMount) {
		if (forMount || props.baseData != this.props.baseData) { // if base-data changed
			this.SetState({newData: Clone(props.baseData)});
		}
	}

	render() {
		let {forNew, enabled, style, onChange, creator} = this.props;
		let {newData} = this.state;
		let Change = _=> {
			if (onChange)
				onChange(this.GetNewData());
			this.Update();
		};

		let splitAt = 170, width = 600;
		return (
			<Column style={style}>
				<RowLR splitAt={splitAt} style={{width}}>
					<Pre>Title: </Pre>
					<TextInput required
						enabled={enabled} style={{width: "100%"}}
						value={newData.title} onChange={val=>Change(newData.title = val)}/>
				</RowLR>
			</Column>
		);
	}
	GetValidationError() {
		return GetErrorMessagesUnderElement(GetDOM(this))[0];
	}

	GetNewData() {
		let {newData} = this.state;
		return Clone(newData) as Thread;
	}
}