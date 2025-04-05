const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');

dotenv.config();

// Configure file upload
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "You are a legal assistant. Provide accurate legal information in simple terms."
        }, {
          role: "user",
          content: message
        }],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

// Handle routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
