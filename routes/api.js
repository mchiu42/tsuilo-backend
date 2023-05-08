var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    return apiResponse({
        success: true,
        code: 200,
        message: 'API is working',
    }, res)
});

module.exports = router;
