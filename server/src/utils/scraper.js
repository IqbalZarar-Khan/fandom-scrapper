const axios = require('axios');
const cheerio = require('cheerio');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

async function scrapeCategories(url) {
  try {
    const cached = cache.get(url);
    if (cached) return cached;

    const response = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(response.data);
    const categories = [];
    
    $('.category-page__member-link').each((i, el) => {
      const title = $(el).text();
      const href = $(el).attr('href');
      categories.push({ title, href: new URL(href, url).href });
    });

    cache.set(url, categories);
    return categories;
  } catch (error) {
    console.error(`Error scraping categories: ${error.message}`);
    return [];
  }
}

async function scrapePage(url, wss) {
  try {
    const cached = cache.get(url);
    if (cached) return cached;

    const response = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(response.data);
    const content = {};
    
    $('h2, h3').each((i, el) => {
      const sectionTitle = $(el).text();
      const sectionContent = [];
      let next = $(el).next();
      
      while (next.length && !next.is('h2, h3')) {
        if (next.is('p, ul, ol')) {
          sectionContent.push(next.text().trim());
        }
        next = next.next();
      }
      
      content[sectionTitle] = sectionContent.join('\n');
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ message: `Scraping ${sectionTitle}...` }));
        }
      });
    });

    cache.set(url, content);
    return content;
  } catch (error) {
    console.error(`Error scraping page ${url}: ${error.message}`);
    return {};
  }
}

module.exports = { scrapeCategories, scrapePage };