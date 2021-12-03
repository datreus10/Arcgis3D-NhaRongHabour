const jwt = require('jsonwebtoken');


const getloginpage = (req, res, next) => {
    res.render('LoginPage');
}

const login = (req, res, next) => {
    try {
        const {
            username,
            password
        } = req.body;
        console.log(username, password);
        if (username == "admin" && password == "admin") {
            const token = jwt.sign({
                username: "admin",
            }, 'test', {
                expiresIn: "24h"
            });
            res.cookie("token", token);
            res.redirect('/admin');
        } else {
            return res.send("Sai mật khẩu");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const logout = (req, res, next) => {
    try {
        res.clearCookie("token");
        //res.clearCookie("userName");
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    getloginpage,
    login,
    logout
}