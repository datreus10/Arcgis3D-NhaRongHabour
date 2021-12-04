const express = require('express');
const {gethomepage,getaboutus} = require('../controllers/gethomepage.js');
const router = express.Router();

/* GET home page. */
router.get('/',gethomepage);
router.get('/about',getaboutus);

module.exports = router;