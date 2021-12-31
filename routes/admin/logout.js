const express = require('express');
const {logout} = require('../../controllers/admin/auth');
const router = express.Router();

/* GET home page. */
router.get('/',logout);

module.exports = router;