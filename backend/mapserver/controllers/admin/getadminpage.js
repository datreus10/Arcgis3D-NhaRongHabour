const e = require("express");

const getadminpage = (req, res, next) => {
    if(req.username!="admin"){
        res.redirect('/login');
    }
    else
    {
        res.render('AdminPage',{description: "This is admin page",username: req.username});
    }
    
}

module.exports = {
    getadminpage
}