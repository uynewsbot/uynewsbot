import PageParserBase from "./PageParserBase.mjs";
import jQuery from "jquery";

export default class Elpaiscomuy extends PageParserBase {
    static name =  'ElPais';
    static domainMatcher = [
        'elpais.com.uy',
        'tvshow.com.uy',
        'ovaciondigital.com.uy'
    ]
    selectorsToRemove = [
        '.report-error-container',
        '.contenido-exclusivo-nota',
        '.header-default',
        '.header-category',
        '.search-box-header',
        '.weather-header',
        '.middle-header',
        'header',
        '.modules-ads-container',
        '.ads-under-header',
        '.ads-under-header',
        'footer'
    ];
    checkPaywalJSDOM(dom) {
        const $ = jQuery(dom.window);
        return $('contenido-exclusivo-nota.box-ui').length > 0
    }
}
