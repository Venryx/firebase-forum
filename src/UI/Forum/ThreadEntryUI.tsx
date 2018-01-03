import React from "react";
import {BaseComponent} from "react-vextensions";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {Thread} from "../../Store/firebase/forum/@Thread";
import {GetThreadPosts} from "../../Store/firebase/forum";
import {Connect} from "../../Utils/Database/FirebaseConnect";
import {ACTThreadSelect} from "../../Store/forum";
import {columnWidths} from "./SubforumUI";
import {Post} from "../../Store/firebase/forum/@Post";
import {Manager} from "../../Manager";
import {VURL} from "js-vextensions";
import {Link} from "../@Shared/Link";

export type ThreadEntryUI_Props = {index: number, last: boolean, thread: Thread} & Partial<{creator: User, posts: Post[]}>;
@Connect((state, {thread})=> ({
	creator: thread && Manager.GetUser(thread.creator),
	posts: thread && GetThreadPosts(thread),
}))
export class ThreadEntryUI extends BaseComponent<ThreadEntryUI_Props, {}> {
	render() {
		let {index, last, thread, creator, posts} = this.props;
		let toURL = new VURL(null, ["threads", thread._id+""]);
		return (
			<Column p="7px 10px" style={E(
				{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
				last && {borderRadius: "0 0 10px 10px"}
			)}>
				<Row>
					<Link text={thread.title} actions={d=>d(new ACTThreadSelect({id: thread._id}))} style={{fontSize: 17, flex: columnWidths[0]}}/>
					<span style={{flex: columnWidths[1]}}>{creator ? creator.displayName : "..."}</span>
					<span style={{flex: columnWidths[2]}}>{posts ? posts.length : "..."}</span>
				</Row>
			</Column>
		);
	}
}