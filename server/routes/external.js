const router = require('express').Router();
const request = require('superagent');

const API_KEY = '1';

const apiEndpointBase = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=`;

const apiEndpointBaseRSS = 'https://www.reddit.com/.rss';
router.get('/rss/', (req, res) => {
  request
    .get(apiEndpointBaseRSS)
    .buffer(true)
    .then(result => {
      console.log('router external API result2: \n', result);
      res.send(result.text);
    });
});

// router.get('/:recipe', (req, res) => {
//   request.get(apiEndpointBase + req.params.recipe).then(result => {
//     console.log('router external API result: \n', result.body);
//     res.body(result.body);
//   });
// });

module.exports = router;
