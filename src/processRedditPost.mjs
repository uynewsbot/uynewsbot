import {checkIfProcessed, flagAsProcessed} from './botState.mjs';
import parsePage from './PageParser/index.mjs';
import articlePostProcessor from './articlePostProcessor.mjs';

export default async function processRedditPost(rPost) {
    try {
        if (rPost.is_self) {
            console.log('post is not a link', rPost.id);
            return;
        }
        const isProcessed = await checkIfProcessed(rPost);
        if (isProcessed) {
            console.log('Already processed', rPost.id);
            return;
        }
        if (!rPost.url) {
            console.log('post is not a link', rPost.id);
        }

        const postUrl = rPost.url_overridden_by_dest;
        const pageParserResult = await parsePage(postUrl);
        if (!pageParserResult.success) {
            console.log('Error in process', rPost.id, postUrl, pageParserResult.error);
            return;
        }

        const finalTextComment = articlePostProcessor(
            pageParserResult
        );

        await rPost.reply(finalTextComment);
        console.log('processed', rPost.id, postUrl);
        await flagAsProcessed(rPost);

    } catch(e) {
        console.error('ERROR', e);
        if (rPost) {
            console.error('ERROR POST', rPost.subreddit_name_prefixed, rPost.url_overridden_by_dest, rPost.id);
        }
    }
}
