const express = require('express');
const {gethomepage,getaboutus} = require('../controllers/gethomepage.js');
const {auth} = require('../middlewares/auth');
const router = express.Router();

/* GET home page. */
router.get('/',auth,gethomepage);
router.get('/about',auth,getaboutus);

module.exports = router;