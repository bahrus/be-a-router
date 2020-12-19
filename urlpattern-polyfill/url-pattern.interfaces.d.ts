export interface URLPatternInit {
    baseURL?: string;
    username?: string;
    password?: string;
    protocol?: string;
    hostname?: string;
    port?: string;
    pathname?: string;
    search?: string;
    hash?: string;
}
export declare type URLPatternKeys = keyof URLPatternInit;
export interface URLPatternComponentResult {
    input?: any;
    [key: string]: {
        input: any;
        groups: any;
    } | any;
}
//# sourceMappingURL=url-pattern.interfaces.d.ts.map