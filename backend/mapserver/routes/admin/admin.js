const express = require('express');
const {getadminpage} = require('../../controllers/admin/getadminpage');
const {auth} = require('../../middlewares/auth');
const router = express.Router();

/* GET home page. */
router.get('/',auth,getadminpage);

module.exports = router;
