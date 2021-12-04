var express = require('express');
var {getnen,getTrangTri,createpolygon,createcirculation} = require('../../controllers/data/getdata');
var router = express.Router();

/* GET users listing. */
router.get('/nen', getnen);
router.get('/trangtri', getTrangTri);
router.post('/createpolygon',createpolygon);
router.post('/createcirculation',createpolygon);

module.exports = router;