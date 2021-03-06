import React from "react";
import {Button, Column, Row} from "react-vcomponents";
import {BaseComponentWithConnector} from "react-vextensions";
import {ScrollView} from "react-vscrollview";
import {IsUserAdmin} from "../General";
import {manager, OnPopulated} from "../Manager";
import {GetSections, GetSectionSubforums, GetSubforumThreads, GetThread, GetSubforumLastPost} from "../Store/firebase/forum";
import {Section} from "../Store/firebase/forum/@Section";
import {Subforum} from "../Store/firebase/forum/@Subforum";
import {ACTSubforumSelect, ACTThreadSelect, GetSelectedSubforum, GetSelectedThread} from "../Store/forum";
import {ShowAddSectionDialog} from "./Forum/AddSectionDialog";
import {ShowAddSubforumDialog} from "./Forum/AddSubforumDialog";
import {SubforumUI} from "./Forum/SubforumUI";
import {ThreadUI} from "./Forum/ThreadUI";
import {Assert, E} from "js-vextensions";

export const columnWidths = [.55, .15, .3];

let ForumUI_connector = (state, {}: {})=> ({
	_: manager.GetUserPermissionGroups(manager.GetUserID()) as any,
	sections: GetSections(),
	selectedSubforum: GetSelectedSubforum(),
	selectedThread: GetSelectedThread(),
});
let wrapped = false;
OnPopulated(()=> {
	(ForumUI as any) = manager.Connect(ForumUI_connector)(ForumUI)
	wrapped = true;
});
export class ForumUI extends BaseComponentWithConnector(ForumUI_connector, {}) {
	constructor(props) {
		Assert(wrapped, "ForumUI is being created before the class has been wrapped by Connect()!");
		super(props);
	}
	
	render() {
		let {sections, selectedSubforum, selectedThread} = this.props;

		if (selectedThread) {
			return <ThreadUI thread={selectedThread}/>;
		}
		if (selectedSubforum) {
			return <SubforumUI subforum={selectedSubforum}/>;
		}

		let userID = manager.GetUserID();
		let isAdmin = IsUserAdmin(userID);
		return (
			<Column style={ES({width: 960, margin: "20px auto 20px auto", flex: 1, filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"})}>
				{isAdmin && <Column className="clickThrough" style={{height: 40, background: "rgba(0,0,0,.7)", borderRadius: 10}}>
					<Row style={{height: 40, padding: 10}}>
						<Button text="Add section" ml="auto" onClick={()=> {
							if (userID == null) return manager.ShowSignInPopup();
							ShowAddSectionDialog(userID);
						}}/>
					</Row>
				</Column>}
				<ScrollView style={ES({flex: 1})} contentStyle={ES({flex: 1})}>
					{sections.length == 0 && <div style={{textAlign: "center", fontSize: 18}}>Loading...</div>}
					{sections.map((section, index)=> {
						return <SectionUI key={index} section={section}/>;
					})}
				</ScrollView>
			</Column>
		);
	}
}

let SectionUI_connector = (state, {section}: {section: Section})=> ({
	subforums: GetSectionSubforums(section),
});
OnPopulated(()=>(SectionUI as any) = manager.Connect(SectionUI_connector)(SectionUI));
export class SectionUI extends BaseComponentWithConnector(SectionUI_connector, {}) {
	render() {
		let {section, subforums} = this.props;
		let userID = manager.GetUserID();
		let isAdmin = IsUserAdmin(userID);
		return (
			<Column style={{width: 960, margin: "20px auto 20px auto"}}>
				<Column className="clickThrough" style={{height: 70, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
					<Row style={{position: "relative", height: 40, padding: 10}}>
						<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 18}}>{section.name}</span>
						{isAdmin &&
							<Button text="Add subforum" ml="auto" onClick={()=> {
								if (userID == null) return manager.ShowSignInPopup();
								ShowAddSubforumDialog(userID, section._id);
							}}/>}
					</Row>
					<Row style={{height: 30, padding: 10}}>
						<span style={{flex: columnWidths[0], fontWeight: 500, fontSize: 15}}>Subforum</span>
						<span style={{flex: columnWidths[1], fontWeight: 500, fontSize: 15}}>Threads</span>
						<span style={{flex: columnWidths[2], fontWeight: 500, fontSize: 15}}>Last post</span>
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

let SubforumEntryUI_connector = (state, {subforum}: {index: number, last: boolean, subforum: Subforum})=> {
	let lastPost = GetSubforumLastPost(subforum._id);
	return {
		threads: GetSubforumThreads(subforum._id),
		lastPost,
		lastPostThread: lastPost && GetThread(lastPost.thread),
		lastPostCreator: lastPost && manager.GetUser(lastPost.creator),
	};
};
OnPopulated(()=>(SubforumEntryUI as any) = manager.Connect(SubforumEntryUI_connector)(SubforumEntryUI));
export class SubforumEntryUI extends BaseComponentWithConnector(SubforumEntryUI_connector, {}) {
	render() {
		let {index, last, subforum, threads, lastPost, lastPostThread, lastPostCreator} = this.props;
		//let toURL = new VURL(null, [subforum._id+""]);
		return (
			<Column p="7px 10px" style={E(
				{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
				last && {borderRadius: "0 0 10px 10px"}
			)}>
				<Row>
					{/*<manager.Link text={subforum.name} to={toURL.toString({domain: false})} style={{fontSize: 18, flex: columnWidths[0]}} onClick={e=> {
						e.preventDefault();
						store.dispatch(new ACTSubforumSelect({id: subforum._id}));
					}}/>*/}
					<manager.Link text={subforum.name} actions={[new ACTSubforumSelect({id: subforum._id})]} style={{fontSize: 18, flex: columnWidths[0]}}/>
					<span style={{flex: columnWidths[1]}}>{threads.length}</span>
					<manager.Link style={{flex: columnWidths[2], fontSize: 13}} actions={lastPost == null ? [] : [new ACTThreadSelect({id: lastPost.thread})]}>
						{lastPostThread && lastPostCreator &&
							<div>
								{lastPostThread.title}, by { lastPostCreator.displayName}<br/>
								{!manager.FormatTime(lastPost.createdAt, "[calendar]").includes("/")
									? manager.FormatTime(lastPost.createdAt, "[calendar]")
									: manager.FormatTime(lastPost.createdAt, "YYYY-MM-DD HH:mm:ss")}
							</div>}
					</manager.Link>
				</Row>
			</Column>
		);
	}
}