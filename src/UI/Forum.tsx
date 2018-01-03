import React from "react";
import {BaseComponent} from "react-vextensions";
import {Row} from "react-vcomponents";
import {ScrollView} from "react-vscrollview";
import {Column} from "react-vcomponents";
import {Section} from "../Store/firebase/forum/@Section";
import {Subforum} from "../Store/firebase/forum/@Subforum";
import {SubforumUI} from "./Forum/SubforumUI";
import {Button} from "react-vcomponents";
import {ShowAddSectionDialog} from "./Forum/AddSectionDialog";
import {ShowAddSubforumDialog} from "./Forum/AddSubforumDialog";
import {ThreadUI} from "./Forum/ThreadUI";
import {Connect} from "../Utils/Database/FirebaseConnect";
import {GetSections, GetSectionSubforums, GetSubforumThreads} from "../Store/firebase/forum";
import {GetSelectedSubforum, GetSelectedThread, ACTSubforumSelect} from "../Store/forum";
import {Manager} from "../Manager";
import {IsUserAdmin} from "../General";
import {Thread} from "../Store/firebase/forum/@Thread";
import {Link} from "./@Shared/Link";

export const columnWidths = [.7, .3];

@Connect(state=> ({
	_: Manager.GetUserPermissionGroups(Manager.GetUserID()),
	sections: GetSections(),
	selectedSubforum: GetSelectedSubforum(),
	selectedThread: GetSelectedThread(),
}))
export class ForumUI extends BaseComponent<{} & Partial<{sections: Section[], selectedSubforum: Subforum, selectedThread: Thread}>, {}> {
	render() {
		let {sections, selectedSubforum, selectedThread} = this.props;

		if (selectedThread) {
			return <ThreadUI thread={selectedThread}/>;
		}
		if (selectedSubforum) {
			return <SubforumUI subforum={selectedSubforum}/>;
		}

		let userID = Manager.GetUserID();
		let isAdmin = IsUserAdmin(userID);
		return (
			<Column style={{width: 960, margin: "20px auto 20px auto", flex: 1, filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"}}>
				{isAdmin && <Column className="clickThrough" style={{height: 40, background: "rgba(0,0,0,.7)", borderRadius: 10}}>
					<Row style={{height: 40, padding: 10}}>
						<Button text="Add section" ml="auto" onClick={()=> {
							if (userID == null) return Manager.ShowSignInPopup();
							ShowAddSectionDialog(userID);
						}}/>
					</Row>
				</Column>}
				<ScrollView style={{flex: 1}} contentStyle={{flex: 1}}>
					{sections.length == 0 && <div style={{textAlign: "center", fontSize: 18}}>Loading...</div>}
					{sections.map((section, index)=> {
						return <SectionUI key={index} section={section}/>;
					})}
				</ScrollView>
			</Column>
		);
	}
}

type SectionUI_Props = {section: Section} & Partial<{subforums: Subforum[]}>;
@Connect((state, {section}: SectionUI_Props)=> ({
	subforums: GetSectionSubforums(section),
}))
class SectionUI extends BaseComponent<SectionUI_Props, {}> {
	render() {
		let {section, subforums} = this.props;
		let userID = Manager.GetUserID();
		let isAdmin = IsUserAdmin(userID);
		return (
			<Column style={{width: 960, margin: "20px auto 20px auto"}}>
				<Column className="clickThrough" style={{height: 70, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
					<Row style={{height: 40, padding: 10}}>
						<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 18}}>{section.name}</span>
						{isAdmin &&
							<Button text="Add subforum" ml="auto" onClick={()=> {
								if (userID == null) return Manager.ShowSignInPopup();
								ShowAddSubforumDialog(userID, section._id);
							}}/>}
					</Row>
					<Row style={{height: 30, padding: 10}}>
						<span style={{flex: columnWidths[0], fontWeight: 500, fontSize: 15}}>Subforum</span>
						<span style={{flex: columnWidths[1], fontWeight: 500, fontSize: 15}}>Threads</span>
					</Row>
				</Column>
				<Column>
					{subforums.length == 0 && <div style={{textAlign: "center", fontSize: 18}}>Loading...</div>}
					{subforums.map((subforum, index)=> {
						return <SubforumEntryUI key={subforum._id} index={index} last={index == subforums.length - 1} subforum={subforum}/>;
					})}
				</Column>
			</Column>
		);
	}
}

type SubforumEntryUIProps = {index: number, last: boolean, subforum: Subforum} & Partial<{threads: Thread[]}>;
@Connect((state, {subforum}: SubforumEntryUIProps)=> ({
	threads: GetSubforumThreads(subforum),
}))
class SubforumEntryUI extends BaseComponent<SubforumEntryUIProps, {}> {
	render() {
		let {index, last, subforum, threads} = this.props;
		//let toURL = new VURL(null, [subforum._id+""]);
		return (
			<Column p="7px 10px" style={E(
				{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
				last && {borderRadius: "0 0 10px 10px"}
			)}>
				<Row>
					{/*<Link text={subforum.name} to={toURL.toString({domain: false})} style={{fontSize: 18, flex: columnWidths[0]}} onClick={e=> {
						e.preventDefault();
						store.dispatch(new ACTSubforumSelect({id: subforum._id}));
					}}/>*/}
					<Link text={subforum.name} actions={d=>d(new ACTSubforumSelect({id: subforum._id}))} style={{fontSize: 18, flex: columnWidths[0]}}/>
					<span style={{flex: columnWidths[1]}}>{threads.length}</span>
				</Row>
			</Column>
		);
	}
}