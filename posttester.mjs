import Snoowrap from 'snoowrap';
import nconf from 'nconf';

global.__basedir = process.cwd();
nconf.file('conf', '.configuration.json' )
    .file('credentials', '.credentials.json');

import processRedditPost from './src/processRedditPost.mjs';

const snoowrap = new Snoowrap({
    userAgent: nconf.get('bot:userAgent'),
    clientId: nconf.get('credentials:clientId'),
    clientSecret: nconf.get('credentials:clientSecret'),
    username: nconf.get('credentials:redditUser'),
    password: nconf.get('credentials:redditPass'),
});

async function commandLineProcess() {
    const post = await snoowrap.getSubmission('m8u4et').fetch();
    await processRedditPost(post);
}

commandLineProcess();


