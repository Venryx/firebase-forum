import React from "react";
import {BaseComponent, GetInnerComp, BaseComponentWithConnector} from "react-vextensions";
import {Subforum} from "../../Store/firebase/forum/@Subforum";
import {Row, DropDownTrigger, DropDownContent} from "react-vcomponents";
import {Button} from "react-vcomponents";
import {DropDown} from "react-vcomponents";
import {Column} from "react-vcomponents";
import {SubforumDetailsUI} from "./SubforumDetailsUI";
import {Thread} from "../../Store/firebase/forum/@Thread";
import {ScrollView} from "react-vscrollview";
import {Spinner} from "react-vcomponents";
import {DeleteSubforum} from "../../Server/Commands/DeleteSubforum";
import {ShowAddThreadDialog} from "./AddThreadDialog";
import {GetSubforumThreads} from "../../Store/firebase/forum";
import {ThreadEntryUI} from "./ThreadEntryUI";
import {ACTSubforumSelect} from "../../Store/forum";
import {Manager, PermissionGroupSet, manager} from "../../Manager";
import {UpdateSubforumDetails} from "../../Server/Commands/UpdateSubforumDetails";
import {GetAsync, GetUpdates} from "../../Utils/Database/DatabaseHelpers";
import {ShowMessageBox} from "react-vmessagebox";
import {colors} from "../GlobalStyles";
import {IsUserMod} from "../../General";

export const columnWidths = [.5, .2, .1, .2];

let SubforumUI_connector = (state, {subforum}: {subforum: Subforum, subNavBarWidth?: number})=> {
	return {
		permissions: manager.GetUserPermissionGroups(manager.GetUserID()),
		threads: GetSubforumThreads(subforum._id),
	};
};
manager.onPopulated.then(()=>(SubforumUI as any) = manager.Connect(SubforumUI_connector)(SubforumUI));
export class SubforumUI extends BaseComponentWithConnector(SubforumUI_connector, {}) {
	static defaultProps = {subNavBarWidth: 0};
	render() {
		let {subforum, subNavBarWidth, threads, permissions} = this.props;
		let userID = manager.GetUserID();
		
		if (subforum == null || threads == null) {
			return <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 25}}>Loading threads...</div>;
		}

		return (
			<Column style={ES({position: "relative", flex: 1})}>
				<ActionBar_Left subforum={subforum} subNavBarWidth={subNavBarWidth}/>
				<ActionBar_Right subforum={subforum} subNavBarWidth={subNavBarWidth}/>
				<ScrollView ref="scrollView" scrollVBarStyle={{width: 10}} style={ES({flex: 1})}>
					<Column style={{width: 960, margin: "50px auto 20px auto", filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"}}>
						<Column className="clickThrough" style={{height: 80, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
							<Row style={{position: "relative", height: 40, padding: 10}}>
								<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 18}}>{subforum.name}</span>
								<Button text="Add thread" ml="auto" onClick={()=> {
									if (userID == null) return manager.ShowSignInPopup();
									ShowAddThreadDialog(userID, subforum._id);
								}}/>
							</Row>
							<Row style={{height: 40, padding: 10}}>
								<span style={{flex: columnWidths[0], fontWeight: 500, fontSize: 17}}>Title</span>
								<span style={{flex: columnWidths[1], fontWeight: 500, fontSize: 17}}>Creator</span>
								<span style={{flex: columnWidths[2], fontWeight: 500, fontSize: 17}}>Posts</span>
								<span style={{flex: columnWidths[3], fontWeight: 500, fontSize: 17}}>Last post</span>
							</Row>
						</Column>
						<Column>
							{threads.length == 0 &&
								<Row p="7px 10px" style={{background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px"}}>
									There are currently no threads in this subforum.
								</Row>}
							{threads.map((thread, index)=> {
								return <ThreadEntryUI key={index} index={index} last={index == threads.length - 1} thread={thread}/>;
							})}
						</Column>
					</Column>
				</ScrollView>
			</Column>
		);
	}
}

type ActionBar_LeftProps = {subforum: Subforum, subNavBarWidth: number};
class ActionBar_Left extends BaseComponent<ActionBar_LeftProps, {}> {
	render() {
		let {subforum, subNavBarWidth} = this.props;

		return (
			<nav style={{
				position: "absolute", zIndex: 1, left: 0, width: `calc(50% - ${subNavBarWidth / 2}px)`, top: 0, textAlign: "center",
				//background: "rgba(0,0,0,.5)", boxShadow: "3px 3px 7px rgba(0,0,0,.07)",
			}}>
				<Row style={{
					justifyContent: "flex-start", background: "rgba(0,0,0,.7)", boxShadow: colors.navBarBoxShadow,
					width: "100%", height: 30, borderRadius: "0 0 10px 0",
				}}>
					<Button text="Back" onClick={()=> {
						store.dispatch(new ACTSubforumSelect({id: null}));
					}}/>
					<DetailsDropdown subforum={subforum}/>
				</Row>
			</nav>
		);
	}
}

class DetailsDropdown extends BaseComponent<{subforum: Subforum}, {dataError: string}> {
	detailsUI: SubforumDetailsUI;
	render() {
		let {subforum} = this.props;
		let {dataError} = this.state;
		let isMod = IsUserMod(manager.GetUserID());
		return (
			<DropDown>
				<DropDownTrigger>
					<Button ml={5} text="Details"/>
				</DropDownTrigger>
				<DropDownContent style={{left: 0}}>
					<Column>
						<SubforumDetailsUI ref={c=>this.detailsUI = c} baseData={subforum}
							forNew={false} enabled={isMod}
							onChange={newData=> {
								this.SetState({dataError: this.detailsUI.GetValidationError()});
							}}/>
						{isMod &&
							<Row>
								<Button mt={5} text="Save" enabled={dataError == null} onLeftClick={async ()=> {
									let subforumUpdates = GetUpdates(subforum, this.detailsUI.GetNewData());
									await new UpdateSubforumDetails({subforumID: subforum._id, subforumUpdates}).Run();
								}}/>
							</Row>}
						{isMod &&
							<Column mt={10}>
								<Row style={{fontWeight: "bold"}}>Advanced:</Row>
								<Row>
									<Button mt={5} text="Delete" onLeftClick={async ()=> {
										let threads = await GetAsync(()=>GetSubforumThreads(subforum._id));
										if (threads.length != 0) {
											return void ShowMessageBox({title: `Still has threads`,
												message: `Cannot delete this subforum until all its threads have been deleted.`});
										}

										ShowMessageBox({
											title: `Delete "${subforum.name}"`, cancelButton: true,
											message: `Delete the subforum "${subforum.name}"?`,
											onOK: async ()=> {
												await new DeleteSubforum({subforumID: subforum._id}).Run();
												store.dispatch(new ACTSubforumSelect({id: null}));
											}
										});
									}}/>
								</Row>
							</Column>}
					</Column>
				</DropDownContent>
			</DropDown>
		)
	}
}

class ActionBar_Right extends BaseComponent<{subforum: Subforum, subNavBarWidth: number} & Partial<{initialChildLimit: number}>, {}> {
	render() {
		let {subforum, subNavBarWidth, initialChildLimit} = this.props;
		let tabBarWidth = 104;
		return (
			<nav style={{
				position: "absolute", zIndex: 1, left: `calc(50% + ${subNavBarWidth / 2}px)`, right: 0, top: 0, textAlign: "center",
				//background: "rgba(0,0,0,.5)", boxShadow: "3px 3px 7px rgba(0,0,0,.07)",
			}}>
				<Row style={{
					justifyContent: "flex-end", background: "rgba(0,0,0,.7)", boxShadow: colors.navBarBoxShadow,
					width: "100%", height: 30, borderRadius: "0 0 0 10px",
				}}>
					{/*<DropDown>
						<DropDownTrigger>
							<Button text="Layout"/>
						</DropDownTrigger>
						<DropDownContent style={{right: 0}}>
							<Column>
								<Row>
									<Pre>Initial child limit: </Pre>
									<Spinner min={1} value={initialChildLimit} onChange={val=>store.dispatch(new ACTSetInitialChildLimit({value: val}))}/>
								</Row>
							</Column>
						</DropDownContent>
					</DropDown>*/}
				</Row>
			</nav>
		);
	}
}