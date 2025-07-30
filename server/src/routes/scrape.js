const express = require('express');
const { scrapeCategories, scrapePage } = require('../utils/scraper');
const { generateFile } = require('../utils/fileGenerator');
const router = express.Router();

router.post('/categories', async (req, res) => {
  const { url } = req.body;
  const categories = await scrapeCategories(url);
  res.json(categories);
});

router.post('/page', async (req, res) => {
  const { url } = req.body;
  const content = await scrapePage(url, req.app.get('wss'));
  res.json(content);
});

router.post('/download', async (req, res) => {
  const { content, format, filename } = req.body;
  generateFile(content, format, filename);
  res.json({ message: `File ${filename}.${format} generated` });
});

module.exports = router;