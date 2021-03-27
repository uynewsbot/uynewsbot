import PageParserBase from "./PageParserBase.mjs";

export default class Teledocecom extends PageParserBase {
    static name =  'Telemundo';
    static domainMatcher = [
        'teledoce.com'
    ]
    selectorsToRemove = [
        'amp-auto-ads',
        'header',
        'nav',
        '.related',
        '.secondary',
        '.entry-meta',
        '.fb-comments',
        '.topposts',
        '.sticky-footer',
        '.site-footer'
    ];
    static match(pUrl) {
        const matchDomain = super.match(pUrl);
        if (!matchDomain) {
            return false;
        }
        const url = new URL(pUrl);
        return url.pathname.indexOf('/telemundo/') !== -1;
    }
}
