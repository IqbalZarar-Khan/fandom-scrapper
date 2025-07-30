import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategorySelector from './components/CategorySelector';
import ProgressBar from './components/ProgressBar';
import ConsoleLog from './components/ConsoleLog';
import DownloadButton from './components/DownloadButton';
import ThemeToggle from './components/ThemeToggle';
import StatusModal from './components/StatusModal';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedPath, setSelectedPath] = useState([]);
  const [content, setContent] = useState({});
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [format, setFormat] = useState('md');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLogs((prev) => [...prev, data.message]);
      setProgress((prev) => Math.min(prev + 20, 100));
    };
    return () => ws.close();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/scrape/categories', { url });
      setCategories(response.data);
    } catch (error) {
      setLogs((prev) => [...prev, `Error fetching categories: ${error.message}`]);
    }
  };

  const handleCategorySelect = async (path) => {
    setSelectedPath(path);
    setProgress(0);
    setLogs([]);
    const lastItem = path[path.length - 1];
    if (lastItem?.href) {
      const response = await axios.post('http://localhost:5000/api/scrape/page', { url: lastItem.href });
      setContent(response.data);
    }
  };

  const handleDownload = async () => {
    setIsModalOpen(true);
    await axios.post('http://localhost:5000/api/scrape/download', {
      content,
      format,
      filename: 'scraped_content'
    });
    setIsModalOpen(false);
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      <ThemeToggle isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      <h1>Fandom Wiki Scraper</h1>
      <input
        type="text"
        placeholder="Enter Fandom Wiki URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={fetchCategories}>Fetch Categories</button>
      <CategorySelector
        categories={categories}
        onSelect={handleCategorySelect}
      />
      <ProgressBar progress={progress} />
      <ConsoleLog logs={logs} />
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="md">Markdown (.md)</option>
        <option value="txt">Text (.txt)</option>
        <option value="pdf">PDF (.pdf)</option>
        <option value="docx">Word (.docx)</option>
      </select>
      <DownloadButton onClick={handleDownload} />
      <StatusModal isOpen={isModalOpen} message="Downloading..." />
    </div>
  );
}

export default App;