/**
 * @param staticProps Can be either an object or array.
 * @param dynamicProps Can be either an object or array.
 * @param transformFunc The data-transformer. Whenever a dynamic-prop changes, this will be called, and the new result will be cached.
 */
/**
 * @param transformType The name of the transformation; usually a function-name like "GetSomeThing", or "connectProp_processX". (used, along with static-props, to form a "storage key", where cache is checked for and stored)
 * @param staticProps An array.
 * @param dynamicProps Can be either an object or array.
 * @param transformFunc The data-transformer. Whenever a dynamic-prop changes, this will be called, and the new result will be cached.
 */
export declare function CachedTransform<T, T2, T3>(transformType: string, staticProps: any[], dynamicProps: T2, transformFunc: (staticProps: any[], dynamicProps: T2) => T3): T3;
export declare function CombineDynamicPropMaps(...maps: any[]): {};
