import React from "react";
import {Column, Div} from "react-vcomponents";
import {BaseComponent, GetInnerComp, BaseComponentWithConnector} from "react-vextensions";
import {Row} from "react-vcomponents";
import {Button, Span} from "react-vcomponents";
import {PostEditorUI} from "./PostEditorUI";
import {Thread} from "../../../Store/firebase/forum/@Thread";
import {Post} from "../../../Store/firebase/forum/@Post";
import {ShowMessageBox} from "react-vmessagebox";
import {DeletePost} from "../../../Server/Commands/DeletePost";
import {UpdatePost} from "../../../Server/Commands/UpdatePost";
import {Manager, manager} from "../../../Manager";
import { GetUpdates } from "../../../Utils/Database/DatabaseHelpers";
import {IsUserCreatorOrMod} from "../../../General";

//let VReactMarkdown_Remarkable = manager.MarkdownRenderer as any;

let PostUI_connector = (state, {post}: {index: number, thread: Thread, post: Post})=> ({
	creator: manager.GetUser(post.creator),
});
export let PostUI: typeof PostUI_NC; manager.onPopulated.then(()=>PostUI = manager.Connect(PostUI_connector)(PostUI_NC));
export class PostUI_NC extends BaseComponentWithConnector(PostUI_connector, {editing: false, dataError: null as string}) {
	postEditorUI: PostEditorUI;
	render() {
		let {index, thread, post, creator} = this.props;
		let {editing, dataError} = this.state;

		if (editing) {
			return (
				<Column sel mt={index != 0 ? 20 : 0} style={{flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, padding: 10, alignItems: "flex-start", cursor: "auto"}}>
					<PostEditorUI ref={c=>this.postEditorUI = c} baseData={post}
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

		let creatorOrMod = IsUserCreatorOrMod(manager.GetUserID(), post);
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
				<Column p={10} style={ES({flex: 1})}>
					<Row style={{width: "100%"}}>
						{/*post.text*/}
						<manager.MarkdownRenderer source={post.text != null ? post.text : "*This post has been deleted.*"}/>
					</Row>
					<Row mt="auto">
						<span style={{color: "rgba(255,255,255,.5)"}}>{creator ? creator.displayName : "..."}, at {manager.FormatTime(post.createdAt, "YYYY-MM-DD HH:mm:ss")}</span>
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
							{post.text != null ? "edited" : "deleted"} at {manager.FormatTime(post.editedAt, "YYYY-MM-DD HH:mm:ss")}
						</Span>}
					</Row>
				</Column>
			</Row>
		);
	}
}