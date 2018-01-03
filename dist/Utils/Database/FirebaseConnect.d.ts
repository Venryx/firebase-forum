import { RootState } from "../../General";
export declare function Connect<T, P>(innerMapStateToPropsFunc: (state: RootState, props: P) => any): any;
export declare function Connect<T, P>(mapStateToProps_inner_getter: () => (state: RootState, props: P) => any): any;
