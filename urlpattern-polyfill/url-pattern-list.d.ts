import { URLPattern } from './url-pattern';
import { URLPatternComponentResult } from './url-pattern.interfaces';
export declare class URLPatternList {
    private patterns;
    constructor(list: URLPattern[], options?: {});
    test(url: string): boolean;
    exec(url: string): URLPatternComponentResult | null | number;
}
//# sourceMappingURL=url-pattern-list.d.ts.map