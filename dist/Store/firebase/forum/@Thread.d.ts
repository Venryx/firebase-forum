export declare class Thread {
    constructor(initialData: Partial<Thread>);
    _id: number;
    title: string;
    subforum: number;
    posts: number[];
    creator: string;
    createdAt: number;
}
