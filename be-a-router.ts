import {NavigateTrait} from 'navigate-trait/navigate-trait.js';
import {define} from 'xtal-element/XtalElement.js';
import {URLPattern} from './urlpattern-polyfill/url-pattern.js';
import {URLPatternInit} from './urlpattern-polyfill/url-pattern.interfaces.js';

export class BeARouter extends NavigateTrait{
    static is = 'be-a-router';

    #patterns: URLPattern[] | undefined;

    parseURL(url: string, anchor?: HTMLAnchorElement){
      
        if(this.#patterns === undefined){
            const jsonScript = this.querySelector('script');
            if(jsonScript == null){
                setTimeout(() => {
                    this.parseURL(url);
                }, 50);
                return;
            }
            const parsedJSONScript = JSON.parse(jsonScript.innerHTML) as URLPatternInit[];
            this.#patterns = parsedJSONScript.map(p => {
                const returnObj = new URLPattern(p);
                (returnObj as any).baseURL = p.baseURL;
                return returnObj;
            });
        }
        for(const p of this.#patterns){
            let newURL = url;
            if(anchor !== undefined){
                newURL = (p as any).baseURL + '/' + anchor.getAttribute('href');
            }  
            const result = p.exec(newURL) as URLPatternInit;
            console.log(result);
            if(result !== null){
                const currentState = history.state || {};
                const newState = Object.assign(currentState, (result as any).pathname.groups);
                const iPosOfQ = url.indexOf('?');
                if(iPosOfQ > -1){
                    const qryString = url.substr(iPosOfQ + 1); 
                    const urlSearchParams = new URLSearchParams(qryString);
                    const searchParams: {[key: string]: string} = {};
                    for (const [key, value] of urlSearchParams.entries()) {
                        searchParams[key] = value;
                    }
                    Object.assign(newState, {searchParams});
                }
                history.pushState(newState, anchor?.innerText??'', newURL);
                break;
            }
        }

    }
}
define(BeARouter);