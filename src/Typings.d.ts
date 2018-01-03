declare var store;

type User = {
	_key?: string;
	avatarUrl: string;
	displayName: string;
	email: string;
	providerData: UserInfo[];
};
type UserInfo = {
	displayName: string;
	email: string;
	photoURL: string;
	providerId: string;
	uid: string;
}