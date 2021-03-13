import stripHtml from "string-strip-html";

const MAX_LENGTH = 9200;
const truncateContent = (input) => input.length > MAX_LENGTH ? `${input.substring(0, MAX_LENGTH)}...(Truncado)` : input;

function sanitizeTitleLine(pInput) {
    if (typeof pInput !== 'string') return '';
    let sanitizedInput = stripHtml.stripHtml(pInput);
    sanitizedInput = (sanitizedInput && sanitizedInput.result) || '';
    return sanitizedInput.trim();

}
export default function articlePostProcessor(articleContent, extraData) {
    var titleParts = [];

    var siteName = sanitizeTitleLine(extraData.siteName);
    var title = sanitizeTitleLine(extraData.title);
    var byline = sanitizeTitleLine(extraData.byline);

    if (siteName && siteName !== 'mysitename') { //Busqueda, WTF? srsly?
        titleParts.push(siteName);
    }
    if (title) {
        titleParts.push(title);
    }
    if (byline && byline !== siteName) {
        titleParts.push('Por: ' + byline);
    }

    var finalContent = '[' + (titleParts.join(' - ')
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')) + '](' + extraData.source + ')';
    finalContent += `\n\n^(Fecha del snapshot: ${extraData.date.replace(/\([\s\S]*?\)/g, '')})`;
    finalContent += `\n\n### Texto de la noticia:\n\n`;
    finalContent += truncateContent(articleContent);
    finalContent += '\n\n___';
    finalContent += '\n\nbot by: /u/zonan';

    if (extraData.paywall) {
        finalContent += '\n\n^(Texto posiblemente truncado por paywall)';
    }
    return finalContent;
}
