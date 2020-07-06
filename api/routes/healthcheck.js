var express = require('express');
var router = express.Router();

var got = require('got');
const Configuration = require('../configuration/configuration');
var config = new Configuration();

const checkServerHealth = async (req, res, next) => {
    try {
        var response = await got(config.NHTSA_VIN_URL);
        if (response.statusCode == 200 || response.statusCode == 304)
        {
            res.send(JSON.parse('{"server": "ok", "nhtsa": "ok"}'));
        }
        else
        {
            res.send(JSON.parse('{"server": "ok", "nhtsa": "error"}'))
        }

    } catch (error) {
        res.send(JSON.parse('{"server": "error", "nhtsa": "error"}'))
        console.log(error.response);
    }
};

router.get('/', checkServerHealth);

module.exports = router;