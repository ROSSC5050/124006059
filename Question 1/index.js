const express = require('express');
const axios = require('axios');
const usedport = 8008;
const app = express();
app.use(express.json());
app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  const allnum = [];
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'url not valid' });}
  async function fetchData(url) {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      const data = response.data;
      if (Array.isArray(data.numbers)) {
        allnum.push(...data.numbers);
      }} catch (error) {
      console.error(` unknown error form ${url}: ${error.message}`);
    }}
  await Promise.all(urls.map((url) => fetchData(url)));
  const unisortnum = [...new Set(allnum)].sort((a, b) => a - b);
  res.json({ numbers: unisortnum  });
});
app.listen(usedport, () => {
  console.log(`${usedport} runs on this port`);
});