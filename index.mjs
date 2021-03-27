import Snoowrap from 'snoowrap';
import SnooStorm from 'snoostorm';
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

function registerClient(clientConfig) {
    console.log('Registering', clientConfig);
    const isTestMode = nconf.get('environment') === 'test';
    const client = new SnooStorm.SubmissionStream(snoowrap, {
        subreddit: clientConfig.id,
        limit: clientConfig.limit,
        pollTime: isTestMode ? 30000 : clientConfig.frequencyInMs
    });
    client.on('item', processRedditPost);
}

async function registerClients() {
    const clients = nconf.get('subreddits');
    const isTestMode = nconf.get('environment') === 'test';
    const finalClients = isTestMode ? clients.filter(val => val.testmode === true) : clients;
    const waitTimeBetweenRegistrations = 60000 / finalClients.length;

    for (const client of finalClients) {
        registerClient(client);
        if (!isTestMode) {
            await new Promise(resolve => setTimeout(resolve, waitTimeBetweenRegistrations));
        }
    }
}


registerClients();



