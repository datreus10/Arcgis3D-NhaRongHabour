var express = require('express');
var {getsize,getfloor,getcolumn,getTrangTri,createpolygon,createcirculation} = require('../../controllers/data/getdata');
var router = express.Router();

/* GET users listing. */

router.get('/size', getsize);
router.get('/floor', getfloor);
router.get('/column', getcolumn);
router.get('/trangtri', getTrangTri);
router.post('/createpolygon',createpolygon);
router.post('/createcirculation',createcirculation);

module.exports = router;