const express = require('express');
const {gethomepage} = require('../controllers/gethomepage.js');
const router = express.Router();

/* GET home page. */
router.get('/',gethomepage);

module.exports = router;