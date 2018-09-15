const router = require('express').Router()
const request = require('superagent')

const API_KEY = '1'

const apiEndpointBase = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=`

router.get('/:recipe', (req, res) => {
    request.get(apiEndpointBase + req.params.recipe)
    .then(result => {
        console.log('router external API result: \n', result.body)
        res.json(result.body)
    })
})

module.exports = router