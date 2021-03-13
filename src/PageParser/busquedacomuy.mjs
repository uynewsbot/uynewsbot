import PageParserBase from "./PageParserBase.mjs";
import jQuery from "jquery";

export default class Busquedacomuy extends PageParserBase {
    static name =  'Búsqueda';
    static domainMatcher = [
        'busqueda.com.uy'
    ]
    selectorsToRemove = [
        '.main-img',
        '.plan_suscriptores',
        '.item.comments',
        '.despliegue-info.align-middle'
    ];
    checkPaywalJSDOM(dom) {
        const $ = jQuery(dom.window);
        return $('.plan_suscriptores').find(':contains(nota es exclusiva)').length > 0;
    }
}
