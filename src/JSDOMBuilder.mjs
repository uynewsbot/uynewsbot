import JSDOM from 'jsdom';

export default function buildJSDOM(data) {
    const virtualConsole = new JSDOM.VirtualConsole();
    virtualConsole.on('error', () => { /* enjoy the silence */ });
    virtualConsole.on('warn', () => { /* enjoy the silence */ });
    virtualConsole.on('info', () => { /* enjoy the silence */ });
    virtualConsole.on('dir', () => { /* enjoy the silence */ });

    const doc = new JSDOM.JSDOM(
        data,
        {
            features: {
                FetchExternalResources: false,
                ProcessExternalResources: false,
            },
            virtualConsole
        }
    );

    return doc;
}
