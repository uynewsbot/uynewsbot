import PageParserBase from "./PageParserBase.mjs";
import jQuery from "jquery";

export default class Bbccom extends PageParserBase {
    static name =  'BBC';
    static domainMatcher = [
        'bbc.com'
    ]
    selectorsToRemove = [
        '[data-component="image-block"]',
        '[data-component="tag-list"]',
        '[data-component="see-alsos"]',
        '[data-component="topStories"]',
    ];
}
