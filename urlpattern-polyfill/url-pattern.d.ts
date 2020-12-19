import { URLPatternComponentResult, URLPatternInit } from './url-pattern.interfaces';
export declare class URLPattern {
    private pattern;
    private regexp;
    private keys;
    constructor(init: URLPatternInit | string, baseURL?: string);
    test(input: string): boolean;
    exec(input: string | URLPatternInit): URLPatternComponentResult | null | undefined;
}
//# sourceMappingURL=url-pattern.d.ts.map