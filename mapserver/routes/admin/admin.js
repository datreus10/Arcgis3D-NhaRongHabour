const express = require("express");
const {
    getadminpage,
    postadminpage,
    getadminpagecirculation,
    getadminpagefence,
} = require("../../controllers/admin/adminpage");
const { auth } = require("../../middlewares/auth");
const router = express.Router();

/* GET home page. */
router.get("/", auth, getadminpage);
router.post("/", auth, postadminpage);
router.get("/admin_circulation", auth, getadminpagecirculation);
router.get("/admin_fence", auth, getadminpagefence);

module.exports = router;
