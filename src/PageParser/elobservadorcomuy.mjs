import PageParserBase from "./PageParserBase.mjs";
import jQuery from "jquery";

export default class Elobservadorcomuy extends PageParserBase {
    static name =  'ElObservador';
    static domainMatcher = [
        'elobservador.com.uy'
    ]
    selectorsToRemove = [
        '.btn--reportar-error',
        '.comentarios',
        '.contenedor__publicidad',
        '.banda--opinion',
        '.volanta_key',
        '.ultimas-noticias',
        '.tp-container-inner',
        '.loginCompra',
        '.login-cont',
        '#modalLogin',
        '.redes',
        '.opacityBody',
        '.member',
        '.tag',
        '.mensaje_paywall2',
        '.mensaje_member'
    ];
    checkPaywalJSDOM(dom) {
        const $ = jQuery(dom.window);
        const dataMember = $('meta[name="cXenseParse:ohs-tag"]');
        const tipoNotaMember = $('meta[name="cXenseParse:ohs-tiponota"]');
        return dataMember && dataMember.attr('content') === 'Member' || tipoNotaMember.attr('content') === 'Member';
    }
}
