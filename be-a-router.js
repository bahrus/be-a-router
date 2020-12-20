import { NavigateTrait } from 'navigate-trait/navigate-trait.js';
import { define } from 'xtal-element/XtalElement.js';
import { URLPattern } from './urlpattern-polyfill/url-pattern.js';
export class BeARouter extends NavigateTrait {
    #patterns;
    parseURL(url, anchor) {
        if (this.#patterns === undefined) {
            const jsonScript = this.querySelector('script');
            if (jsonScript == null) {
                setTimeout(() => {
                    this.parseURL(url);
                }, 50);
                return;
            }
            const parsedJSONScript = JSON.parse(jsonScript.innerHTML);
            this.#patterns = parsedJSONScript.map(p => {
                const returnObj = new URLPattern(p);
                returnObj.baseURL = p.baseURL;
                return returnObj;
            });
        }
        for (const p of this.#patterns) {
            let newURL = url;
            if (anchor !== undefined) {
                newURL = p.baseURL + '/' + anchor.getAttribute('href');
            }
            const result = p.exec(newURL);
            console.log(result);
            if (result !== null) {
                const currentState = history.state || {};
                const newState = Object.assign(currentState, result.pathname.groups);
                const iPosOfQ = url.indexOf('?');
                if (iPosOfQ > -1) {
                    const qryString = url.substr(iPosOfQ + 1);
                    const urlSearchParams = new URLSearchParams(qryString);
                    const searchParams = {};
                    for (const [key, value] of urlSearchParams.entries()) {
                        searchParams[key] = value;
                    }
                    Object.assign(newState, { searchParams });
                }
                history.pushState(newState, anchor?.innerText ?? '', newURL);
                break;
            }
        }
    }
}
BeARouter.is = 'be-a-router';
define(BeARouter);
