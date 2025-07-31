const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const scrapeRoutes = require('./routes/scrape');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'https://<your-vercel-app>.vercel.app' }));
app.use(express.json());
app.use('/api/scrape', scrapeRoutes);
app.use('/outputs', express.static('outputs')); // Serve output files

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const wss = new WebSocket.Server({ server });
app.set('wss', wss);

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message);
  });
});
