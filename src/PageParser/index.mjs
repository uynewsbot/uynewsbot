import Cientoochentacomuy from './180comuy.mjs';
import Busquedacomuy from './busquedacomuy.mjs';
import Elobservadorcomuy from './elobservadorcomuy.mjs';
import Elpaiscomuy from './elpaiscomuy.mjs';
import Ladiariacomuy from './ladiariacomuy.mjs';
import Montevideocomuy from './montevideocomuy.mjs';
import PageParserBase from "./PageParserBase.mjs";
import Lamananacomuy from "./lamananacomuy.mjs";
import _ from 'lodash';


export default async function parsePage(url) {
    const processors = [
        Cientoochentacomuy,
        Busquedacomuy,
        Elobservadorcomuy,
        Elpaiscomuy,
        Ladiariacomuy,
        Montevideocomuy,
        Lamananacomuy
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
