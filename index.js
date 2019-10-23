require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(helmet());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/jobs', async (req, res) => {
  const result = await axios.request({
    url: `https://www.reed.co.uk/api/1.0/search`,
    method: 'GET',
    auth: {
      username: process.env.API_KEY,
      password: ''
    }
  });
  if (result.status === 200) {
    return res.status(200).json({ jobs: result.data.results });
  }
  return res.status(500).json({ message: 'Reed API failed' });
});
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
