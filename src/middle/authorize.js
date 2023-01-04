const jwt = require("jsonwebtoken");
const { writeError } = require("../helpers/response");

const student = (req, res, next) => {
    const token = req.header("x-access-token").split(" ")[1];
    const options = {
        issuer: process.env.ISSUER,
    };
    jwt.verify(token, process.env.SECRET_KEY, options, (err, decodedToken) => {
        // console.log(err);
        if (err && err.name === "TokenExpiredError")
            return writeError(res, 401, err);
        if (err && err.name === "JsonWebTokenError")
            return writeError(res, 400, err);
        // console.log(decodedToken);
        if (decodedToken.role === "student") return next();

        writeError(res, 403, { msg: "Forbidden" });
        // if (decodedToken.payload.role === "Manager") return next();
    });
};

const teacher = (req, res, next) => {
    const token = req.header("x-access-token").split(" ")[1];
    const options = {
        issuer: process.env.ISSUER,
    };
    jwt.verify(token, process.env.SECRET_KEY, options, (err, decodedToken) => {
        // console.log(err);
        if (err && err.name === "TokenExpiredError")
            return writeError(res, 401, err);
        if (err && err.name === "JsonWebTokenError")
            return writeError(res, 400, err);
        // console.log(decodedToken);
        if (decodedToken.role === "teacher") return next();

        writeError(res, 403, { msg: "Forbidden" });
    });
};


const byRole = (role) => (req, res, next) => {
    const token = req.header("x-access-token").split(" ")[1];

    const options = {
        issuer: process.env.ISSUER,
    };
    jwt.verify(token, process.env.SECRET_KEY, options, (err, decodedToken) => {
        // console.log(err);
        if (err && err.name === "TokenExpiredError")
            return writeError(res, 401, err);
        if (err && err.name === "JsonWebTokenError")
            return writeError(res, 400, err);
        // console.log(decodedToken);
        if (decodedToken.role === role) return next();

        writeError(res, 403, { msg: "Forbidden" });
        // if (decodedToken.payload.role === "Manager") return next();
    });
};

module.exports = {
    student,
    teacher,
    byRole
};