import fs from 'fs';
import path from 'path';

export async function checkIfProcessed(redditPost) {
    return fs.existsSync(path.join(__basedir, 'data' , redditPost.id));
}

export async function flagAsProcessed(redditPost) {
    return fs.writeFileSync(path.join(__basedir, 'data' , redditPost.id), '');
}
