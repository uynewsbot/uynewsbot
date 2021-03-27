import PageParserBase from "./PageParserBase.mjs";

export default class Elpaiscomuy extends PageParserBase {
    static name =  'Subrayado';
    static domainMatcher = [
        'subrayado.com.uy'
    ]
    selectorsToRemove = [
        '.temas-rel',
        '.articles-rel',
        '.widgetContent',
        '#comentarios',
        '.aside-section'
    ];
}
