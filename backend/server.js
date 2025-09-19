const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON request bodies
// Helper function to read data from the JSON file
function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}
// Helper function to write data to the JSON file
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}
// POST endpoint to receive new data
app.post('/api/posts', (req, res) => {
  const posts = readData();
  const newPost = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...req.body
  };
  posts.push(newPost);
  writeData(posts);
  console.log('Received new post:', newPost);
  res.status(201).json(newPost);
});
// GET endpoint to retrieve all data
app.get('/api/posts', (req, res) => {
  const posts = readData();
  res.status(200).json(posts);
});
// DELETE endpoint to clear all data
app.delete('/api/posts', (req, res) => {
  writeData([]);
  console.log('All posts cleared.');
  res.status(200).json({ message: 'All posts cleared successfully.' });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
  console.log(`Data will be stored in: ${DATA_FILE}`);
});
