export declare class Section {
    constructor(initialData: Partial<Section>);
    _id: number;
    name: string;
    subforumOrder: number[];
}
export declare const Section_nameFormat = "^[a-zA-Z0-9 ,\\-()\\/]+$";
