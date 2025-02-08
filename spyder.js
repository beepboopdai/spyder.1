// spyder.1 -- a really shitty and basically useless webcrawler

function getLinks() {
    var hrefElements = document.querySelectorAll('[href]');
    var links = [];

    hrefElements.forEach(element => {
        const href = element.getAttribute('href');

        href ? (href.includes('https://' || 'http://') ? links.push(href) : console.log('href not link, skipping element..')) : console.log('no link, skipping element...')
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

var depth = 0;

async function crawl(verbose, maxDepth) {
    const links = getLinks();
    console.log('links found: ', links);

    for (const link of links) {
        if ( depth >= maxDepth) {
            console.log('reached max depth, stopping spyder...')
            break;
        }

         if ( verbose == 1 ) {
            console.log(`getting content from ${link}..`)
        }

        const content = await fetchPageContent(link);

        if ( content ) {
            console.log(`content of ${link}: \n\n`, content)
        }

        depth++
    }

}

console.log(crawl(1, 3))