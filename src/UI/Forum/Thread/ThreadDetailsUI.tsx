import React from "react";
import {BaseComponent} from "react-vextensions";
import {Pre} from "react-vcomponents";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {TextInput} from "react-vcomponents";
import {Select} from "react-vcomponents";
import {RowLR} from "react-vcomponents";
import {CheckBox} from "react-vcomponents";
import {ScrollView} from "react-vscrollview";
import {Button} from "react-vcomponents";
import {Spinner} from "react-vcomponents";
import {Thread} from "../../../Store/firebase/forum/@Thread";
import {GetErrorMessagesUnderElement} from "js-vextensions";

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