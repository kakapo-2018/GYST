const router = require('express').Router();
const request = require('superagent');

const apiEndpointBaseRSSreddit = 'https://www.reddit.com/.rss';

const apiEndpointBaseRSSstuff =
  'http://rss.nzherald.co.nz/rss/xml/nzhtsrsscid_000000698.xml';

const apiEndpointBaseRSShack = 'https://hackaday.com/blog/feed/';

router.get('/rss/:source', (req, res) => {
  let newsSource = '';
  if (req.params.source == 'reddit') {
    newsSource = apiEndpointBaseRSSreddit;
  } else if (req.params.source == 'stuff') {
    newsSource = apiEndpointBaseRSSstuff;
  } else if (req.params.source == 'hackaday') {
    newsSource = apiEndpointBaseRSShack;
  }

  console.log(req.params.source);
  request
    .get(newsSource)
    .buffer(true)
    .then(result => {
      res.send(result.text);
    })
    .catch(err => console.log(err));
});

//External json api example
// const API_KEY = '1';
// const apiEndpointBase = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=`;
// router.get('/:recipe', (req, res) => {
//   request.get(apiEndpointBase + req.params.recipe).then(result => {
//     console.log('router external API result: \n', result.body);
//     res.body(result.body);
//   });
// });

module.exports = router;
