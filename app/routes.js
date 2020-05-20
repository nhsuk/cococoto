const express = require('express');
const axios = require('axios');

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

module.exports = router;
