var express = require('express');
var {getuserpage} = require('../../controllers/user/getuserpage')
var {auth} =require('../../middlewares/auth')
var router = express.Router();

/* GET users listing. */
router.get('/',auth, getuserpage);

module.exports = router;
