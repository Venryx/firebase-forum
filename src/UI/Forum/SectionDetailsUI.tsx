import React from "react";
import {BaseComponent, FindDOM} from "react-vextensions";
import {Pre, RowLR} from "react-vcomponents";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {TextInput} from "react-vcomponents";
import {Select} from "react-vcomponents";
import {CheckBox} from "react-vcomponents";
import {ScrollView} from "react-vscrollview";
import {Button} from "react-vcomponents";
import {Spinner} from "react-vcomponents";
import {Section} from "../../Store/firebase/forum/@Section";
import { GetErrorMessagesUnderElement } from "js-vextensions";

export type SectionDetailsUI_Props = {baseData: Section, forNew: boolean, enabled?: boolean, style?, onChange?: (newData: Section)=>void}
	& Partial<{creator: User}>;
export class SectionDetailsUI extends BaseComponent<SectionDetailsUI_Props, {newData: Section}> {
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
			<div> {/* needed so GetInnerComp() works */}
			<Column style={style}>
				<RowLR mt={5} splitAt={splitAt} style={{width}}>
					<Pre>Name: </Pre>
					<TextInput required
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
		return Clone(newData) as Section;
	}
}