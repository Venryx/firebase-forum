export declare class Subforum {
    constructor(initialData: Partial<Subforum>);
    _id: number;
    name: string;
    section: number;
}
export declare const Subforum_nameFormat = "^[a-zA-Z0-9 ,\\-()\\/]+$";
