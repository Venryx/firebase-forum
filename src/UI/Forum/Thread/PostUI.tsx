import React from "react";
import {Column, Div} from "react-vcomponents";
import {BaseComponent, GetInnerComp} from "react-vextensions";
import {Row} from "react-vcomponents";
import {Button, Span} from "react-vcomponents";
import {PostEditorUI} from "./PostEditorUI";
import {Thread} from "../../../Store/firebase/forum/@Thread";
import {Post} from "../../../Store/firebase/forum/@Post";
import { Connect } from "../../../Utils/Database/FirebaseConnect";
import {ShowMessageBox} from "react-vmessagebox";
import {DeletePost} from "../../../Server/Commands/DeletePost";
import {UpdatePost} from "../../../Server/Commands/UpdatePost";
import {Manager} from "../../../Manager";
import { GetUpdates } from "../../../Utils/Database/DatabaseHelpers";
import {IsUserCreatorOrMod} from "../../../General";

//let VReactMarkdown_Remarkable = Manager.MarkdownRenderer as any;

export type PostUI_Props = {index: number, thread: Thread, post: Post} & Partial<{creator: User}>;
@Connect((state, {post}: PostUI_Props)=> ({
	creator: Manager.GetUser(post.creator),
}))
export class PostUI extends BaseComponent<PostUI_Props, {editing: boolean, dataError: string}> {
	postEditorUI: PostEditorUI;
	render() {
		let {index, thread, post, creator} = this.props;
		let {editing, dataError} = this.state;

		if (editing) {
			return (
				<Column sel mt={index != 0 ? 20 : 0} style={{flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, padding: 10, alignItems: "flex-start", cursor: "auto"}}>
					<PostEditorUI ref={c=>this.postEditorUI = GetInnerComp(c) as any} baseData={post}
						onChange={(newData, comp)=> {
							this.SetState({dataError: comp.GetValidationError()});
						}}/>
					<Row mt={5}>
						<Button text="Save" enabled={dataError == null} onLeftClick={async ()=> {
							let postUpdates = GetUpdates(post, this.postEditorUI.GetNewData());
							await new UpdatePost({postID: post._id, postUpdates: postUpdates}).Run();
							this.SetState({editing: false, dataError: null});
						}}/>
						<Button ml={5} text="Cancel" onLeftClick={async ()=> {
							this.SetState({editing: false, dataError: null});
						}}/>
					</Row>
				</Column>
			)
		}

		let creatorOrMod = IsUserCreatorOrMod(Manager.GetUserID(), post);
		return (
			<Row sel mt={index != 0 ? 20 : 0} style={{flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, alignItems: "initial", cursor: "auto"}}>
				<Column style={{width: 125}}>
					<Div p="5px 5px 0 5px" style={{textAlign: "center"}}>
						{creator ? creator.displayName : "..."}
					</Div>
					<Row p="3px 10px 10px 10px">
						<img src={creator ? creator.avatarUrl : ""} style={{margin: "auto", maxWidth: 105, maxHeight: 105}}/>
					</Row>
				</Column>
				<Column p={10} style={{flex: 1}}>
					<Row style={{width: "100%"}}>
						{/*post.text*/}
						<Manager.MarkdownRenderer source={post.text != null ? post.text : "*This post has been deleted.*"}/>
					</Row>
					<Row mt="auto">
						<span style={{color: "rgba(255,255,255,.5)"}}>{creator ? creator.displayName : "..."}, at {Manager.FormatTime(post.createdAt, "YYYY-MM-DD HH:mm:ss")}</span>
						{creatorOrMod &&
							<Button ml={5} text="Edit" onClick={()=> {
								this.SetState({editing: true});
							}}/>}
						{creatorOrMod && index != 0 && (post.text != null || post._id == thread.posts.Last()) &&
							<Button ml={5} text="Delete" onClick={()=> {
								ShowMessageBox({
									title: `Delete post`, cancelButton: true,
									message: `Delete this post?`,
									onOK: async ()=> {
										await new DeletePost({postID: post._id}).Run();
									}
								});
							}}/>}
						{post.editedAt && <Span ml="auto" style={{color: "rgba(255,255,255,.5)"}}>
							{post.text != null ? "edited" : "deleted"} at {Manager.FormatTime(post.editedAt, "YYYY-MM-DD HH:mm:ss")}
						</Span>}
					</Row>
				</Column>
			</Row>
		);
	}
}