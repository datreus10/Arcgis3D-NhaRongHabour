const {Body} = require ('../../models/Body.js');
const {Floor} = require ('../../models/Floor.js');
const {Wall} = require ('../../models/Wall.js');
const {Column} = require ('../../models/Column.js');



const getadminpage = async (req, res, next) => {
    if(req.username!="admin"){
        res.redirect('/login');
    }
    else
    {
        let body = await Body.find();
        let floor = await Floor.find();
        let wall = await Wall.find();
        let column = await Column.find();
        res.render('AdminPage',{bodies: body, floors: floor, walls: wall, columns: column});
        //res.render('AdminPage');
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