import stripHtml from 'string-strip-html';
import nconf from 'nconf';

const MAX_LENGTH = 9200;
const truncateContent = (input) => input.length > MAX_LENGTH ? `${input.substring(0, MAX_LENGTH)}...(Truncado)` : input;

function sanitizeTitleLine(pInput) {
    if (typeof pInput !== 'string') return '';
    let sanitizedInput = stripHtml.stripHtml(pInput);
    sanitizedInput = (sanitizedInput && sanitizedInput.result) || '';
    return sanitizedInput.trim();

}

function buildTitleLink(article) {
    const titleParts = [];
    const siteName = (sanitizeTitleLine(article.siteName) || '').trim();
    const title = sanitizeTitleLine(article.title);
    const byline = (sanitizeTitleLine(article.byline) || '').trim();

    if (siteName && siteName !== 'mysitename') { //Busqueda, WTF? srsly?
        titleParts.push(siteName);
    }
    if (title) {
        titleParts.push(title);
    }
    if (byline && byline !== siteName) {
        titleParts.push('Autor: ' + byline);
    }

    return '[' + (titleParts.join(' - ')
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')) + '](' + article.url + ')';
}

export default function articlePostProcessor(article) {
    let finalContent = buildTitleLink(article);
    finalContent += `\n\n### Texto del artículo:\n\n`;
    finalContent += truncateContent(article.contentAsMd);
    finalContent += '\n\n___';
    if (article.paywallDetected) {
        finalContent += '\n\n^(Texto posiblemente truncado por paywall)';
    }
    finalContent += `\n\n^(Snapshot: ${article.date.replace(/\([\s\S]*?\)/g, '')})`;
    finalContent +=`\n\n[Bot looking for new master](https://www.reddit.com/r/uruguay/comments/mqtxgv/se_busca_dev_ops_para_el_uynewsbot/) - Versión: ${nconf.get('bot:version')})`;

    return finalContent;
}
