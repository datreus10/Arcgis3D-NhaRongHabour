var express = require('express');
var {getuserpage} = require('../../controllers/user/getuserpage')
var router = express.Router();

/* GET users listing. */
router.get('/', getuserpage);

module.exports = router;
