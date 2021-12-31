const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    try {
        const token = req.cookies.token;  
        let decodedData;
        if (token) {
                decodedData=jwt.verify (token, 'test');
                req.username = decodedData?.username;
            }
        else{
                req.username = ""; 
            }
        next();
    }
    catch (error) {
        console.log(error);
        res.redirect('/');
    }
}
module.exports = {auth}