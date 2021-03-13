import JSDOM from 'jsdom';
import Readability from '@mozilla/readability';
import axios from "axios";
import some from 'lodash/some.js';
import h2m from 'h2m';
import jQuery from "jquery";

export default class PageParserBase {
    static domainMatcher = [];
    selectorsToRemove = [];
    h2mConfig = {
        converter: 'CommonMark', //CommonMark
        overides: {
            img: function() { return ''},
            a: function (a) {
                return a.md + '';
            },
            h1: function (node) {
                if (node.md) {
                    return `\n### ${node.md}\n`
                }
            },
            h2: function (node) {
                if (node.md) {
                    return `\n#### ${node.md}\n`
                }
            },
            h3: function (node) {
                if (node.md) {
                    return `\n##### ${node.md}\n`
                }
            },
            h4: function (node) {
                if (node.md) {
                    return `\n###### ${node.md}\n`
                }
            },
            h5: function (node) {
                if (node.md) {
                    return `\n###### ${node.md}\n`
                }
            },
            h6: function (node) {
                if (node.md) {
                    return `\n###### ${node.md}\n`
                }
            },
        }
    }
    constructor(url){
        this._url = url;
        this._originalContent = '';
        this._paywallDetected = false;
    }

    afterFetchFilter(data) {
        return data;
    }
    domFilter(dom) {
        const $ = jQuery(dom.window);
        (this.selectorsToRemove || []).forEach(function(id) {
            try {
                $(id).remove();
            } catch (e) {
                console.error(e);
            }
        });
        return dom;
    }
    afterReadabilityFilter (article) {
        return article;
    }
    checkPaywalJSDOM() {
        return false;
    }

    async fetch() {
        const page = await this._fetch(this._url);
        let data;
        if (!page.success) {
            console.error('Failure in fetching content', page.error);
        }

        data = page.data;
        this._originalContent = page.data;
        data = this.afterFetchFilter(data);

        let doc = new JSDOM.JSDOM(
            data,
            {
                features: {
                    FetchExternalResources: false,
                    ProcessExternalResources: false
                }
            }
        );
        this._paywallDetected = this.checkPaywalJSDOM(doc);

        doc = this.domFilter(doc);

        const isProbablyReaderable = Readability.isProbablyReaderable(doc.window.document);

        if (!isProbablyReaderable) {
            PageParserBase.createError('Not Parseable by readability');
        }

        let article = new Readability.Readability(
            doc.window.document,
            {keepClasses: true}
        ).parse();

        article = this.afterReadabilityFilter(article);

        return {
            success: true,
            paywallDetected: this._paywallDetected,
            originalContent: this._originalContent,
            readabilityContent: article.content,
            contentAsMd: h2m(article.content, this.h2mConfig),
            byline: article.byline,
            title: article.title,
            siteName: article.siteName
        };
    }

    async _fetch(url) {
        const result = await axios.get(
            url,
            {
                headers: {
                    'user-agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/80.2.3.5 Safari/537.36'
                }
            }
        );
        return {
            success: true,
            data: result.data
        };
    }
    static createError(message) {
        return {
            success: false,
            error: message
        };
    }
    static match(pUrl) {
        var url = new URL(pUrl);
        var hostname = url.hostname.toLowerCase().trim();
        return some(this.domainMatcher, function(d) {
            const domainToMatch = d.toLowerCase().trim();
            return domainToMatch === hostname || hostname.endsWith(`.${domainToMatch}`);
        })
    }
}
