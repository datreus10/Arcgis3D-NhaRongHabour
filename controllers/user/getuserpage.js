const getuserpage = (req, res, next) => {
    res.render('UserPage',{username: req.username});
}
module.exports = {
    getuserpage
}