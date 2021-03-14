import Snoowrap from 'snoowrap';
import SnooStorm from 'snoostorm';
import dotenv from 'dotenv';
import {checkIfProcessed, flagAsProcessed} from './src/botState.mjs';
import parsePage from './src/PageParser/index.mjs';
import articlePostProcessor from './src/articlePostProcessor.mjs';
global.__basedir = process.cwd();
dotenv.config();

const snoowrap = new Snoowrap({
    userAgent: 'script:uynewsbot:v1.0.0 (by /u/zonan)',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

const client1 = new SnooStorm.SubmissionStream(snoowrap, {
    subreddit: 'uynewsbottest',
    limit: 10,
    pollTime: 1000 * 60
});

client1.on('item', processTheDamnItem);

setTimeout(function() {
    const client2 = new SnooStorm.SubmissionStream(snoowrap, {
        subreddit: 'uruguay',
        limit: 40,
        pollTime: 1000 * 60 // 30 secs
    });

    client2.on('item', processTheDamnItem);
}, 30000)




async function processTheDamnItem(rPost) {
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

        const time = new Date().toString();
        const pageParserResult = await parsePage(rPost.url_overridden_by_dest);

        if (!pageParserResult.success) {
            console.log('Error in process', rPost.id, rPost.url_overridden_by_dest, pageParserResult.error);
            return;
        }

        const finalTextComment = articlePostProcessor(
            pageParserResult.contentAsMd,
            {
                date: time,
                source: rPost.url_overridden_by_dest,
                paywall: pageParserResult.paywallDetected,
                byline: pageParserResult.byline,
                title: pageParserResult.title,
                siteName: pageParserResult.siteName
            }
        );

        await rPost.reply(finalTextComment);
        console.log('processed', rPost.id, rPost.url_overridden_by_dest);

        await flagAsProcessed(rPost);

    } catch(e) {
        console.error('ERROR', e);
        console.error('ERROR POST', rPost);
    }
}




