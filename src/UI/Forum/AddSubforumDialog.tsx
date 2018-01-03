import React from "react";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {TextInput} from "react-vcomponents";
import {GetInnerComp} from "react-vextensions";
import {Pre} from "react-vcomponents";
import {ThreadDetailsUI} from "./Thread/ThreadDetailsUI";
import {Thread} from "../../Store/firebase/forum/@Thread";
import {AddThread} from "../../Server/Commands/AddThread";
import {SubforumDetailsUI} from "./SubforumDetailsUI";
import {AddSubforum} from "../../Server/Commands/AddSubforum";
import {ShowMessageBox, BoxController} from "react-vmessagebox";
import {Subforum} from "../../Store/firebase/forum/@Subforum";

export function ShowAddSubforumDialog(userID: string, sectionID: number) {
	let newSubforum = new Subforum({
		name: "",
	});
	
	let detailsUI: SubforumDetailsUI;
	let error = null;
	let Change = (..._)=>boxController.UpdateUI();
	let boxController: BoxController = ShowMessageBox({
		title: `Add subforum`, cancelButton: true,
		messageUI: ()=> {
			boxController.options.okButtonClickable = error == null;
			return (
				<Column style={{padding: `10px 0`, width: 600}}>
					<SubforumDetailsUI ref={c=>detailsUI = GetInnerComp(c) as any} baseData={newSubforum} forNew={true}
						onChange={val=>Change(newSubforum = val, error = detailsUI.GetValidationError())}/>
					{error && error != "Please fill out this field." && <Row mt={5} style={{color: "rgba(200,70,70,1)"}}>{error}</Row>}
				</Column>
			);
		},
		onOK: ()=> {
			new AddSubforum({sectionID, subforum: newSubforum}).Run();
		}
	});
}