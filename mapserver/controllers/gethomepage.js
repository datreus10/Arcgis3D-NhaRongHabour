const gethomepage = function (req, res, next) {
    res.render('HomePage');
}

const getaboutus = function (req, res, next) {
    res.render('AboutUs');
}

module.exports = {
    gethomepage,
    getaboutus
}