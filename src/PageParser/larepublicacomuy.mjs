import PageParserBase from "./PageParserBase.mjs";
import jQuery from "jquery";

export default class Larepublicacomuy extends PageParserBase {
    static name =  'La Red 21';
    static domainMatcher = [
        'republica.com.uy'
    ]
    selectorsToRemove = [
        '.post-related',
        '.comments-template',
        '#comments',
        '#respond',
        '.sidebar',
        '.post-meta-wrap',
        '.post-share',
        'figure'
    ];
}
