import {Clone, GetErrorMessagesUnderElement} from "js-vextensions";
import React from "react";
import {Column, Pre, RowLR, TextInput} from "react-vcomponents";
import {BaseComponent, GetDOM} from "react-vextensions";
import {Section} from "../../Store/firebase/forum/@Section";

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
			<Column style={style}>
				<RowLR splitAt={splitAt} style={{width}}>
					<Pre>Name: </Pre>
					<TextInput required
						enabled={enabled} style={{width: "100%"}}
						value={newData.name} onChange={val=>Change(newData.name = val)}/>
				</RowLR>
			</Column>
		);
	}
	GetValidationError() {
		return GetErrorMessagesUnderElement(GetDOM(this))[0];
	}

	GetNewData() {
		let {newData} = this.state;
		return Clone(newData) as Section;
	}
}