const express = require('express')
const User = require('../modules/user')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth')
let api_key = '23e8a808fed6a9b6c2c2413bd4655252'


router.get('/', auth, async (req, res) => {
    try {
        const cityName = req.query.cityName;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).send({ success: true, result: data });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error })
    }
})
module.exports = router