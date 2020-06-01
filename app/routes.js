const express = require('express');
const axios = require('axios');
const highlightjs = require('highlight.js');

const router = express.Router();

router.get('/symptoms', async (_, res) => {
  // Request for coronavirus content page for expanded content
  const { data: { modules } } = await axios('https://api.nhs.uk/conditions/coronavirus-covid-19/?modules=true&url=www.nhs.uk');
  const { text: expanded } = modules.find(({ name }) => name === 'symptoms');
  // Request for coronavirus content FAQs for voice content
  const { data: { mainEntity } } = await axios('https://api.nhs.uk/conditions/coronavirus-covid-19/faqs');
  const { acceptedAnswer: { text: voice } } = mainEntity.find(({ name }) => name === 'What are the symptoms of coronavirus?');

  return res.render('symptoms.html', {
    expanded,
    voice
  });
});

// Render standalone api examples
router.get('/api-docs', async (req, res) => {
  const endpoint = req.query.swaggerEndpoint;
  const { data: swagger } = await axios(endpoint);
  console.log(swagger);
  return res.render('api-docs.html', { endpoint, ...swagger });
});

module.exports = router;
