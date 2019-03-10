import React from "react";
import { Column, Row } from "react-vcomponents";
import { BoxController, ShowMessageBox } from "react-vmessagebox";
import { AddSection } from "../../Server/Commands/AddSection";
import { Section } from "../../Store/firebase/forum/@Section";
import { SectionDetailsUI } from "./SectionDetailsUI";

export function ShowAddSectionDialog(userID: string) {
	let newSection = new Section({
		name: "",
	});
	
	let detailsUI: SectionDetailsUI;
	let error = null;
	let Change = (..._)=>boxController.UpdateUI();
	let boxController: BoxController = ShowMessageBox({
		title: `Add section`, cancelButton: true,
		message: ()=> {
			boxController.options.okButtonClickable = error == null;
			return (
				<Column style={{width: 600}}>
					<SectionDetailsUI ref={c=>detailsUI = c} baseData={newSection} forNew={true}
						onChange={val=>Change(newSection = val, error = detailsUI.GetValidationError())}/>
					{error && error != "Please fill out this field." && <Row mt={5} style={{color: "rgba(200,70,70,1)"}}>{error}</Row>}
				</Column>
			);
		},
		onOK: ()=> {
			new AddSection({section: newSection}).Run();
		}
	});
}