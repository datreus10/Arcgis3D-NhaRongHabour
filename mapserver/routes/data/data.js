var express = require('express');
var {getnen,getTrangTri} = require('../../controllers/data/getdata');
var router = express.Router();

/* GET users listing. */
router.get('/nen', getTrangTri);

module.exports = router;