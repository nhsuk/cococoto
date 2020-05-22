const express = require('express');
const axios = require('axios');
const highlightjs = require('highlight.js');

const router = express.Router();

router.get('/', async (_, res) => {
  // Request for coronavirus content page for expanded content
  const { data: { modules } } = await axios('https://api.nhs.uk/conditions/coronavirus-covid-19/?modules=true&url=www.nhs.uk');
  const { text: expanded } = modules.find(({ name }) => name === 'symptoms');
  // Request for coronavirus content FAQs for voice content
  const { data: { mainEntity } } = await axios('https://api.nhs.uk/conditions/coronavirus-covid-19/faqs');
  const { acceptedAnswer: { text: voice } } = mainEntity.find(({ name }) => name === 'What are the symptoms of coronavirus?');

  return res.render('index.html', {
    expanded,
    voice
  });
});

// Render standalone api examples
router.get('/api-example/:condition', async (req, res) => {
  const condition = req.params.condition;
  const { data } = await axios(`https://api.nhs.uk/conditions/${condition}/?modules=true&url=www.nhs.uk`);
  const highlightedData = highlightjs.highlightAuto(JSON.stringify(data, null, "  "), ['json']).value;
  return res.render('api-example-wrapper.html', { highlightedData });
});

module.exports = router;
