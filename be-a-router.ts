import {NavigateTrait} from 'navigate-trait/navigate-trait.js';
import {define} from 'xtal-element/XtalElement.js';
import {URLPattern} from './urlpattern-polyfill/url-pattern.js';
import {URLPatternInit} from './urlpattern-polyfill/url-pattern.interfaces.js';

export class BeARouter extends NavigateTrait{
    static is = 'be-a-router';

    #patterns: URLPattern[] | undefined;

    parseLink(link: HTMLAnchorElement){
        if(!link.hasAttribute('href')) return;
        if(this.#patterns === undefined){
            const jsonScript = this.querySelector('script');
            if(jsonScript == null){
                setTimeout(() => {
                    this.parseLink(link);
                }, 50);
                return;
            }
            const parsedJSONScript = JSON.parse(jsonScript.innerHTML) as URLPatternInit[];
            this.#patterns = parsedJSONScript.map(p => new URLPattern(p));
        }
        for(const p of this.#patterns){
            const result = p.exec(link.href!);
            console.log(result);
            if(result !== null){
                const currentState = history.state || {};
                const newState = Object.assign(currentState, (result as any).pathname.groups);
                history.pushState(newState, link.innerText, link.href);
                break;
            }
        }

    }
}
define(BeARouter);