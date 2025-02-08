// spyder.1 -- a really shitty and basically useless webcrawler

const ascii = `
 ░▒▓███████▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░       ░▒▓█▓▒░ 
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░   ░▒▓████▓▒░ 
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░ 
 ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░ ░▒▓███████▓▒░       ░▒▓█▓▒░ 
       ░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░ 
       ░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░ 
░▒▓███████▓▒░░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░ 

heya!
`;
console.warn('%c' + ascii, 'font-family: monospace;')

function getLinks() {
    var hrefElements = document.querySelectorAll('[href]');
    var links = [];

    hrefElements.forEach(element => {
        const href = element.getAttribute('href');

        href ? (href.includes(('https://' || 'http://') && '.html') ? links.push(href) : console.log('href not link, skipping element..')) : console.log('no link, skipping element...')
    })

    return links;
}

async function fetchPageContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`http error! status: ${response.status}`);
        }
        const content = await response.text();
        return content;
    } catch (error) {
        console.error(`error fetching ${url}:`, error);
        return null;
    }
}

async function crawl(verbose) {
    const links = getLinks();
    console.log('links found: ', links);

    for (const link of links) {
         if ( verbose === 1) {
            console.log(`getting content from ${link}..`)
        }

        const content = await fetchPageContent(link);

        if ( content ) {
            content.includes('<!DOCTYPE html>') ? console.log(`content of ${link}: \n\n`, content) : console.log('hey thats not a fucking html file! skipping it!(gonna end it rn i swear)')
        }
    }

}

var verboseInput = prompt('verbose? (1 or 0)');

console.log(crawl(parseInt(verboseInput)), parseInt(depthInput))