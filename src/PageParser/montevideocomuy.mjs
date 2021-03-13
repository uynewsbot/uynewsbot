import PageParserBase from "./PageParserBase.mjs";

export default class Montevideocomuy extends PageParserBase {
    static name =  'MontevideoCom';
    static domainMatcher = [
        'montevideo.com.uy',
        'pantallazo.com.uy',
        'cartelera.com.uy',
        'gastronomia.com.uy',
        'futbol.com.uy'
    ]
    selectorsToRemove = [
        '#interes',
        '.pie_abajo'
    ]
}
