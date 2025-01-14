const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authz = async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        console.log("re.body ", req.body.token);
        console.log("cookies ",req.cookies.token);
        //console.log("header ",req.header("Authorization").replace("Bearer ",""))
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing, please login first"
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token"
        });
    }
    next();
};



exports.isPatient = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Patient") {
            return res.status(403).json({
                success: false,
                message: "Access forbidden. This protected route is for Patient only."
            });
        }
        //console.log("yes");
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not matching"
        });
    }
};
