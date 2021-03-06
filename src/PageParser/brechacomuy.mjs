import PageParserBase from "./PageParserBase.mjs";
import jQuery from "jquery";

export default class Brechacomuy extends PageParserBase {
    static name =  'Brecha';
    static domainMatcher = [
        'brecha.com.uy'
    ]
    selectorsToRemove = [
        '.mepr-unauthorized-message',
        '.post-nav-related',
        '.articulo_categoria'
    ];
    checkPaywalJSDOM(dom) {
        const $ = jQuery(dom.window);
        return $.find('.mepr-unauthorized-message').length > 0 || $.find('.ArtPago').length > 0;
    }
}
