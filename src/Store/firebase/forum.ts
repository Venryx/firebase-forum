import {Section} from "./forum/@Section";
import {Thread} from "./forum/@Thread";
import {Post} from "./forum/@Post";
import {GetData} from "../../Utils/Database/DatabaseHelpers";
import {CachedTransform} from "../../Utils/VCache";
import {Subforum} from "./forum/@Subforum";
import { emptyArray } from "../../General";

export interface ForumData {
	general: ForumData_General;
	sections: {[key: number]: Section};
	threads: {[key: number]: Thread};
	posts: {[key: number]: Post};
}
export interface ForumData_General {
	lastSectionID: number;
	lastSubforumID: number;
	lastThreadID: number;
	lastPostID: number;
	sectionOrder: number[];
}

export function GetSection(id: number): Section {
	return GetData("sections", id);
}
export function GetSections(): Section[] {
	let sectionMap = GetData("sections");
	return CachedTransform("GetSections", [], sectionMap, ()=>sectionMap ? sectionMap.VValues(true) : []);
}

export function GetSubforum(id: number): Subforum {
	if (id == null) return null;
	return GetData("subforums", id);
}
export function GetSubforums(): Subforum[] {
	let subforumMap = GetData("subforums");
	return CachedTransform("GetSubforums", [], subforumMap, ()=>subforumMap ? subforumMap.VValues(true) : []);
}
export function GetSectionSubforums(section: Section): Subforum[] {
	/*let subforums = GetSubforums();
	return CachedTransform("GetSubforums", [sectionID], subforums, ()=>subforums.filter(subforum=>section));*/
	//let subforums = (section.subforums || {}).VKeys(true).map(id=>GetSubforum(id.ToInt()));
	let subforums = (section.subforumOrder || []).map(id=>GetSubforum(id));
	if (subforums.filter(a=>a == null).length) return emptyArray;
	return CachedTransform("GetSectionSubforums", [section._id], subforums, ()=>subforums);
}

export function GetThread(id: number): Thread {
	if (id == null) return null;
	return GetData("threads", id);
}
export function GetThreads(): Thread[] {
	let threadMap = GetData("threads");
	return CachedTransform("GetThreads", [], threadMap, ()=>threadMap ? threadMap.VValues(true) : []);
}
export function GetSubforumThreads(subforum: Subforum): Thread[] {
	let threads = GetThreads();
	return CachedTransform("GetSubforumThreads", [subforum._id], threads, ()=>threads.filter(thread=>thread.subforum == subforum._id));
}

export function GetPost(id: number): Post {
	if (id == null) return null;
	return GetData("posts", id);
}
export function GetPosts(): Post[] {
	let postsMap = GetData("posts");
	return CachedTransform("GetPosts", [], postsMap, ()=>postsMap ? postsMap.VValues(true) : []);
}
export function GetThreadPosts(thread: Thread): Post[] {
	let posts = thread.posts.map(id=>GetPost(id));
	if (posts.filter(a=>a == null).length) return emptyArray;
	return CachedTransform("GetThreadPosts", [thread._id], posts, ()=>posts);
}