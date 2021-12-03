const {Body} = require ('../../models/Body.js');

const getadminpage = (req, res, next) => {
    if(req.username!="admin"){
        res.redirect('/login');
    }
    else
    {
        res.render('AdminPage',{description: "This is admin page",username: req.username});
    }
}

const getadminpagecirculation = (req, res, next) => {
    if(req.username!="admin"){
        res.redirect('/login');
    }
    else
    {
        res.render('admin_circulation',{description: "This is admin page",username: req.username});
    }
}

const postadminpage = async (req, res, next) => {
    if(req.username!="admin"){
        res.redirect('/login');
    }
    else
    {
        const{
            bodyName
        } = req.body;
        const body = new Body({
            Name: bodyName}
            );
        await body.save();
        res.send(body);
    }
}
module.exports = {
    getadminpage,
    postadminpage,
    getadminpagecirculation
}