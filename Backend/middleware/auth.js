var jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const result = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (err) {
        return res.status(401).send({ msg: "Invalid Token" })
    }
}
module.exports = auth;