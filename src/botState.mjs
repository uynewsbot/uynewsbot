import fs from 'fs';
import path from 'path';
import nconf from 'nconf';

export async function checkIfProcessed(redditPost) {
    const isTestMode = nconf.get('environment') === 'test';
    if (isTestMode) {
        return false;
    }
    return fs.existsSync(path.join(__basedir, 'data' , redditPost.id));
}

export async function flagAsProcessed(redditPost) {
    const isTestMode = nconf.get('environment') === 'test';
    if (isTestMode) {
        return false;
    }
    return fs.writeFileSync(path.join(__basedir, 'data' , redditPost.id), '');
}
