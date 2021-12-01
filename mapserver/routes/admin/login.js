const express = require('express');
const {getloginpage,login} = require('../../controllers/admin/auth');
const router = express.Router();

/* GET home page. */
router.get('/',getloginpage);
router.post('/',login);

module.exports = router;
