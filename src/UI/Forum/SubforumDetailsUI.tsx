import React from "react";
import {BaseComponent, FindDOM} from "react-vextensions";
import {Pre, RowLR} from "react-vcomponents";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {TextInput} from "react-vcomponents";
import {Select} from "react-vcomponents";
import {CheckBox} from "react-vcomponents";
import ScrollView from "react-vscrollview";
import {Button} from "react-vcomponents";
import {Spinner} from "react-vcomponents";
import {Subforum, Subforum_nameFormat} from "../../Store/firebase/forum/@Subforum";
import {Clone, GetErrorMessagesUnderElement} from "../../General";

export type SubforumDetailsUI_Props = {baseData: Subforum, forNew: boolean, enabled?: boolean, style?, onChange?: (newData: Subforum)=>void};
export default class SubforumDetailsUI extends BaseComponent<SubforumDetailsUI_Props, {newData: Subforum}> {
	ComponentWillMountOrReceiveProps(props, forMount) {
		if (forMount || props.baseData != this.props.baseData) { // if base-data changed
			this.SetState({newData: Clone(props.baseData)});
		}
	}

	render() {
		let {forNew, enabled, style, onChange} = this.props;
		let {newData} = this.state;
		let Change = _=> {
			if (onChange)
				onChange(this.GetNewData());
			this.Update();
		};

		let splitAt = 170, width = 600;
		return (
			<div> {/* needed so GetInnerComp() works */}
			<Column style={style}>
				<RowLR mt={5} splitAt={splitAt} style={{width}}>
					<Pre>Name: </Pre>
					<TextInput
						pattern={Subforum_nameFormat} required
						enabled={enabled} style={{width: "100%"}}
						value={newData.name} onChange={val=>Change(newData.name = val)}/>
				</RowLR>
			</Column>
			</div>
		);
	}
	GetValidationError() {
		return GetErrorMessagesUnderElement(FindDOM(this))[0];
	}

	GetNewData() {
		let {newData} = this.state;
		return Clone(newData) as Subforum;
	}
}