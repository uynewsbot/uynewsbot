import Cientoochentacomuy from './180comuy.mjs';
import Bbccom from './bbccom.mjs';
import Brechacomuy from './brechacomuy.mjs';
import Busquedacomuy from './busquedacomuy.mjs';
import Diariocambiocomuy from './diariocambiocomuy.mjs';
import Elcascotenewscom from "./elcascotenewscom.mjs";
import Elobservadorcomuy from './elobservadorcomuy.mjs';
import Elpaiscomuy from './elpaiscomuy.mjs';
import Ladiariacomuy from './ladiariacomuy.mjs';
import Lamananacomuy from "./lamananacomuy.mjs";
import Lared21comuy from "./lared21comuy.mjs";
import Larepublicacomuy from "./larepublicacomuy.mjs";
import Montevideocomuy from './montevideocomuy.mjs';
import PageParserBase from "./PageParserBase.mjs";
import Subrayadocomuy from "./subrayadocomuy.mjs";
import Teledocecomuy from "./teledocecomuy.mjs";
import _ from 'lodash';


export default async function parsePage(url) {
    const processors = [
        Cientoochentacomuy,
        Bbccom,
        Brechacomuy,
        Busquedacomuy,
        Diariocambiocomuy,
        Elcascotenewscom,
        Elobservadorcomuy,
        Elpaiscomuy,
        Ladiariacomuy,
        Lamananacomuy,
        Lared21comuy,
        Larepublicacomuy,
        Montevideocomuy,
        Subrayadocomuy,
        Teledocecomuy,
    ];

    const ProcessorClasses = _.filter(processors, function(p) {
        return p.match(url);
    });

    const ProcessorClass = _.first(ProcessorClasses);
    if (!ProcessorClass) {
        return PageParserBase.createError('no matches');
    }
    return new ProcessorClass(url).fetch();
}
