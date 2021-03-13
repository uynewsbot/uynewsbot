import PageParserBase from "./PageParserBase.mjs";

export default class Lamananacomuy extends PageParserBase {
    static name =  'LaMañana';
    static domainMatcher = [
        'www.lamañana.uy',
        'xn--lamaana-7za.uy'
    ]
    selectorsToRemove = [
        'strong:contains(PUEDE INTERESAR)'
    ]
}

