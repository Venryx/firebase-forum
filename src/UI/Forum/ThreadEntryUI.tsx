import React from "react";
import {BaseComponent, BaseComponentWithConnector} from "react-vextensions";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {Thread} from "../../Store/firebase/forum/@Thread";
import {GetThreadPosts, GetSubforumLastPost, GetThreadLastPost} from "../../Store/firebase/forum";
import {ACTThreadSelect} from "../../Store/forum";
import {columnWidths} from "./SubforumUI";
import {Post} from "../../Store/firebase/forum/@Post";
import {Manager, manager, OnPopulated} from "../../Manager";
import {VURL} from "js-vextensions";

let ThreadEntryUI_connector = (state, {thread}: {index: number, last: boolean, thread: Thread})=> {
	let lastPost = GetThreadLastPost(thread._id);
	return ({
		creator: thread && manager.GetUser(thread.creator),
		posts: thread && GetThreadPosts(thread),
		lastPost,
		lastPostCreator: lastPost && manager.GetUser(lastPost.creator),
	});
};
OnPopulated(()=>(ThreadEntryUI as any) = manager.Connect(ThreadEntryUI_connector)(ThreadEntryUI));
export class ThreadEntryUI extends BaseComponentWithConnector(ThreadEntryUI_connector, {editing: false, dataError: null as string}) {
	render() {
		let {index, last, thread, creator, posts, lastPost, lastPostCreator} = this.props;
		let toURL = new VURL(null, ["threads", thread._id+""]);
		return (
			<Column p="7px 10px" style={E(
				{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
				last && {borderRadius: "0 0 10px 10px"}
			)}>
				<Row>
					<manager.Link text={thread.title} actions={d=>d(new ACTThreadSelect({id: thread._id}))} style={{fontSize: 17, flex: columnWidths[0]}}/>
					<span style={{flex: columnWidths[1]}}>{creator ? creator.displayName : "..."}</span>
					<span style={{flex: columnWidths[2]}}>{posts ? posts.length : "..."}</span>
					<manager.Link style={{flex: columnWidths[3], fontSize: 13}} actions={d=>lastPost && d(new ACTThreadSelect({id: lastPost.thread}))}>
						{lastPostCreator &&
							<div>
								By { lastPostCreator.displayName}<br/>
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