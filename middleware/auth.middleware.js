
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { BlacklistModel } = require('../model/blacklist.model')

const auth = async (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.status(404).send({
            "message": "JWT Token Not Found !"
        })
    }

    const token = req.headers['authorization'].split(' ')[1];

    if (token) {
        try {
            const isTokenBlacklisted = await BlacklistModel.findOne({ token: token })

            if (isTokenBlacklisted) {
                return res.status(400).send({
                    "error": "Your jwt token is blacklisted !. [login required]"
                })
            }

            const decoded = jwt.verify(token, process.env.SecretKey);

            if (decoded) {
                req.body.userId = decoded.userId;
                next();
            } else {
                return res.status(400).send({
                    "message": "Kindly Login First to Access Protected Route !"
                })
            }

        } catch (error) {

            return res.status(500).send({
                "error": error.message
            })
        }
    } else {

        return res.status(404).send({
            "message": "JWT Token Not Found !"
        })
    }
}


module.exports = {auth}