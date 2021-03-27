import axios from 'axios';
import jQuery from 'jquery';
import buildJSDOM from "./JSDOMBuilder.mjs";

export async function getCanonicalURL(originalURL) {
    try {
        const page = await axios.get(
            originalURL,
            {
                headers: {
                    'user-agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/80.2.3.5 Safari/537.36'
                }
            }
        );
        const doc = buildJSDOM(page.data);
        const $ = jQuery(doc.window);
        const newURL = $('[rel="canonical"]').attr('href');

        if (!newURL) {
            return originalURL;
        }

        new URL(newURL); //to make sure it's a parseable URL
        return newURL;
    } catch (e) {
        console.log('Error trying to get canonical', e);
        return originalURL;
    }
}
