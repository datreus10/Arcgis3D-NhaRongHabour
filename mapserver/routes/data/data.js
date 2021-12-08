var express = require('express');
var {
    getstep,
    getdoor,
    getcolumndecoration,
    getwall,
    getroof,
    getfloor,
    getcolumn,
    getcircular_decoration,
    createpolygon,
    createcirculation,
    getFence,
    getfloordecoration,
    getfloorbrick,
    getroofbrick,
    createfence,
    searchitemupdate,
    updateitem,
    update
} = require('../../controllers/data/getdata');
var router = express.Router();

/* GET users listing. */

router.get('/floor', getfloor);
router.get('/column', getcolumn);
router.get('/circular_decoration', getcircular_decoration);
router.get('/fence',getFence);
router.get('/wall',getwall);
router.get('/columndecoration',getcolumndecoration);
router.get('/door',getdoor);
router.get('/step',getstep);
router.get('/roof',getroof);
router.get('/floordecoration',getfloordecoration);
router.get('/floorbrick',getfloorbrick);
router.get('/roofbrick',getroofbrick);


router.post('/createpolygon', createpolygon);
router.post('/createcirculation', createcirculation);
router.post('/createfence', createfence);

router.post('/searchitemupdate', searchitemupdate);
router.post('/updateitem',updateitem);
router.post('/update',update);


module.exports = router;