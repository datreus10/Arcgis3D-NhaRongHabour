const express = require('express');
const {getadminpage,postadminpage} = require('../../controllers/admin/adminpage');
const {auth} = require('../../middlewares/auth');
const router = express.Router();

/* GET home page. */
router.get('/',auth,getadminpage);
router.post('/',auth,postadminpage);

module.exports = router;
