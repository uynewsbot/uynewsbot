import PageParserBase from "./PageParserBase.mjs";
import jQuery from "jquery";

export default class Elcascotenewscom extends PageParserBase {
    static name =  'El Cascote News';
    static domainMatcher = [
        'elcascotenews.com'
    ]
    selectorsToRemove = [
        '.wp-post-author-wrap',
        '.navigation-container',
        '#secondary',
        '.promotionspace'
    ];
    checkPaywalJSDOM(dom) {
        const $ = jQuery(dom.window);
        const dataMember = $('meta[name="cXenseParse:ohs-tag"]');
        const tipoNotaMember = $('meta[name="cXenseParse:ohs-tiponota"]');
        return dataMember && dataMember.attr('content') === 'Member' || tipoNotaMember.attr('content') === 'Member';
    }
}
