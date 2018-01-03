import React from "react";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {TextInput} from "react-vcomponents";
import {GetInnerComp} from "react-vextensions";
import {Pre} from "react-vcomponents";
import {ThreadDetailsUI} from "./Thread/ThreadDetailsUI";
import {Thread} from "../../Store/firebase/forum/@Thread";
import {AddThread} from "../../Server/Commands/AddThread";
import {ShowMessageBox, BoxController} from "react-vmessagebox";
import {Post} from "../../Store/firebase/forum/@Post";
import {ACTThreadSelect} from "../../Store/forum";
import {Manager} from "../../Manager";

export const firstPostPlaceholderText = "*Press the Edit button below to write the text for your thread's first post.*";

export function ShowAddThreadDialog(userID: string, subforumID: number) {
	let newThread = new Thread({
		title: "",
		creator: Manager.GetUserID(),
		subforum: subforumID,
	});
	let newPost = new Post({
		text: firstPostPlaceholderText,
		creator: Manager.GetUserID(),
	});
	
	let detailsUI: ThreadDetailsUI;
	let error = null;
	let Change = (..._)=>boxController.UpdateUI();
	let boxController: BoxController = ShowMessageBox({
		title: `Add thread`, cancelButton: true,
		messageUI: ()=> {
			boxController.options.okButtonClickable = error == null;
			return (
				<Column style={{padding: `10px 0`, width: 600}}>
					<ThreadDetailsUI ref={c=>detailsUI = GetInnerComp(c) as any} baseData={newThread} forNew={true}
						onChange={val=>Change(newThread = val, error = detailsUI.GetValidationError())}/>
					{error && error != "Please fill out this field." && <Row mt={5} style={{color: "rgba(200,70,70,1)"}}>{error}</Row>}
				</Column>
			);
		},
		onOK: async ()=> {
			let threadID = await new AddThread({thread: newThread, post: newPost}).Run() as number;
			store.dispatch(new ACTThreadSelect({id: threadID}));
		}
	});
}