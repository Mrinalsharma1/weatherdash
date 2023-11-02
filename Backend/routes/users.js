const express = require('express')
const User = require('../modules/user')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')

const passwordEncrypt = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

router.get('/', auth, async (req, res) => {
    var usrs = await User.find({});

    return res.status(200).send({ success: true, result: usrs })
})

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        var usr = await User.findOne({ email: req.body.email })
        if (usr) return res.status(400).send({ success: false, msg: "Email already Exist" })
        if (!data) return res.status(401).send("Sorry data isn't found")
        let encoded = await passwordEncrypt(req.body.password);

        usr = new User({
            name: req.body.name,
            email: req.body.email,
            password: encoded,
        })
        if (!usr) return res.status(501).send("Data not inserted")
        let temp = await usr.save()
        if (!temp) return res.status(401).send({ success: false, msg: 'data not sended' })
        if (temp) return res.status(200).send({ temp, success: true, msg: 'signup successfully' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error })
    }
})

router.post('/login', async (req, res) => {
    try {
        var usr = await User.findOne({ email: req.body.email })
        if (!usr) return res.status(500).send({ success: false, msg: "Email or Password is wrong" })
        const isValid = await bcrypt.compare(req.body.password, usr.password);
        if (!isValid) return res.status(500).send({ success: false, msg: "Email or Password is wrong" })
        const obj = {
            _id: usr._id.valueOf(),
            email: usr.email
        }
        const token = jwt.sign(obj, process.env.SECRET_KEY)
        const uname = usr.name
        const id = usr._id
        res.status(200).send({ success: true, msg: "login successfully", result: { uname, token } })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error })
    }
})

module.exports = router