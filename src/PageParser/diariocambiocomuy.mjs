import PageParserBase from "./PageParserBase.mjs";
import jQuery from "jquery";

export default class Diariocambiocomuy extends PageParserBase {
    static name =  'Diario Cambio';
    static domainMatcher = [
        'diariocambio.com.uy'
    ]
    selectorsToRemove = [
        '.top-bar',
        '.post-cat',
        '.post-meta',
        '.navigation',
        '.publicidad',
        '.share-items',
        '#header',
        '.related-posts',
        '[role="complementary"]',
        '#footer'
    ];
    checkPaywalJSDOM(dom) {
        const $ = jQuery(dom.window);
        const dataMember = $('meta[name="cXenseParse:ohs-tag"]');
        const tipoNotaMember = $('meta[name="cXenseParse:ohs-tiponota"]');
        return dataMember && dataMember.attr('content') === 'Member' || tipoNotaMember.attr('content') === 'Member';
    }
}
