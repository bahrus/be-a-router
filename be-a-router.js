import { NavigateTrait } from 'navigate-trait/navigate-trait.js';
import { define } from 'xtal-element/XtalElement.js';
import { URLPattern } from './urlpattern-polyfill/url-pattern.js';
export class BeARouter extends NavigateTrait {
    #patterns;
    parseLink(link) {
        if (!link.hasAttribute('href'))
            return;
        if (this.#patterns === undefined) {
            const jsonScript = this.querySelector('script');
            if (jsonScript == null) {
                setTimeout(() => {
                    this.parseLink(link);
                }, 50);
                return;
            }
            const parsedJSONScript = JSON.parse(jsonScript.innerHTML);
            this.#patterns = parsedJSONScript.map(p => new URLPattern(p));
        }
        for (const p of this.#patterns) {
            const result = p.exec(link.href);
            console.log(result);
            if (result !== null) {
                const currentState = history.state || {};
                const newState = Object.assign(currentState, result.pathname.groups);
                const iPosOfQ = link.href.indexOf('?');
                if (iPosOfQ > -1) {
                    const qryString = link.href.substr(iPosOfQ + 1);
                    const urlSearchParams = new URLSearchParams(qryString);
                    const searchParams = {};
                    for (const [key, value] of urlSearchParams.entries()) {
                        searchParams[key] = value;
                    }
                    Object.assign(newState, { searchParams });
                }
                history.pushState(newState, link.innerText, link.href);
                break;
            }
        }
    }
}
BeARouter.is = 'be-a-router';
define(BeARouter);
