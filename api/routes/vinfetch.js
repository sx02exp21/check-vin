var express = require('express');
var router = express.Router();

var got = require('got');
const Configuration = require('../configuration/configuration');
var config = new Configuration();

const getVINData = async (req, res, next) => {
    try {
        var vin = req.params.vin;
        const re = /\$\{vin\}/g;
        var vinstr = config.NHTSA_VIN_URL;

        var vinurl = new URL(vinstr.replace(re, vin));
        var response = await got(vinurl);
        // if (response.statusCode == 200)
        //also checking for use of cached result
        if (response.statusCode == 200 || response.statusCode == 304)
        {
            res.send(response.body);
        }

    } catch (error) {
        console.log(error.response);
    }
};

//dummy service to return simplified result
//to verify data for table display
const getSomeData = async (req, res, next) => {
    try {
        // response = await got(config.NHTSA_VIN_URL);
        // res.send(response.body);
        var data = {"Count":"136","Message":"Results returned successfully. NOTE: Any missing decoded values should be interpreted as NHTSA does not have data on the specific variable. Missing value should NOT be interpreted as an indication that a feature or technology is unavailable for a vehicle.","SearchCriteria":"VIN:123456789","Results":[{"Value":"123456789     ","ValueId":"","Variable":"Suggested VIN","VariableId":"142"},{"Value":"6,11,14","ValueId":"6,11,14","Variable":"Error Code","VariableId":"143"},{"Value":"","ValueId":"","Variable":"Possible Values","VariableId":"144"},{"Value":"Unused position(s): 4,5;","ValueId":"","Variable":"Additional Error Text","VariableId":"156"},{"Value":"6 - Incomplete VIN; 11 - Incorrect Model Year, decoded data may not be accurate; 14 - Unable to provide information for all the characters in the VIN.","ValueId":"","Variable":"Error Text","VariableId":"191"},{"Value":"null","ValueId":"null","Variable":"Destination Market","VariableId":10}]};
        res.send(data);
    } catch (error) {
        console.log(error.response);
    }
};

router.get('/:vin', getVINData);
router.get('/', getSomeData);

module.exports = router;