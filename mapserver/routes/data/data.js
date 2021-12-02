var express = require('express');
var {getnen} = require('../../controllers/data/getdata');
var router = express.Router();

/* GET users listing. */
router.get('/nen', getnen);

module.exports = router;