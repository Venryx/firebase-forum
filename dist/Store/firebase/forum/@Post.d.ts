export declare class Post {
    constructor(initialData: Partial<Post>);
    _id: number;
    thread: number;
    text: string;
    creator: string;
    createdAt: number;
    editedAt: number;
}
