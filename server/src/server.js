const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const scrapeRoutes = require('./routes/scrape');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/scrape', scrapeRoutes);

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: 8080 });
app.set('wss', wss);

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});