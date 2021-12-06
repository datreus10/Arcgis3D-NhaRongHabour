const gethomepage = function (req, res, next) {
    res.render('HomePage',{username: req.username});
}

const getaboutus = function (req, res, next) {
    res.render('AboutUsPage',{username: req.username});
}

module.exports = {
    gethomepage,
    getaboutus
}