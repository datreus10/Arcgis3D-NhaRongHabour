const express = require('express');
const {getloginpage,login} = require('../../controllers/admin/auth');
const {auth} = require('../../middlewares/auth');
const router = express.Router();

/* GET home page. */
router.get('/',auth,getloginpage);
router.post('/',login);

module.exports = router;
