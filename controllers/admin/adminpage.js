const { Body } = require("../../models/Body.js");
const { Floor } = require("../../models/Floor.js");
const { Wall } = require("../../models/Wall.js");
const { Column } = require("../../models/Column.js");

const getadminpage = async(req, res, next) => {
    if (req.username != "admin") {
        res.redirect("/login");
    } else {
        let body = await Body.find();
        let floor = await Floor.find();
        let wall = await Wall.find();
        let column = await Column.find();
        res.render("AdminPage", { bodies: body, floors: floor, walls: wall, columns: column });
    }
};

const getadminpagecirculation = async(req, res, next) => {
    if (req.username != "admin") {
        res.redirect("/login");
    } else {
        let body = await Body.find();
        let column = await Column.find();
        res.render("admin_circulation", { bodies: body, columns: column });
    }
};

const getadminpagefence = async(req, res, next) => {
    if (req.username != "admin") {
        res.redirect("/login");
    } else {
        let body = await Body.find();
        let column = await Column.find();
        res.render("admin_fence", { bodies: body, columns: column });
    }
};

const getadminpageupdate = async(req, res, next) => {
    if (req.username != "admin") {
        res.redirect("/login");
    } else {
        let body = await Body.find();
        let floor = await Floor.find();
        let wall = await Wall.find();
        let column = await Column.find();
        res.render("AdminUpdate", { bodies: body, floors: floor, walls: wall, columns: column });
    }
};


// const postadminpage = async(req, res, next) => {
//     if (req.username != "admin") {
//         res.redirect("/login");
//     } else {
//         const { bodyName } = req.body;
//         const body = new Body({
//             Name: bodyName,
//         });
//         await body.save();
//         res.send(body);
//     }
// };
module.exports = {
    getadminpage,
    //postadminpage,
    getadminpagecirculation,
    getadminpagefence,
    getadminpageupdate,
};