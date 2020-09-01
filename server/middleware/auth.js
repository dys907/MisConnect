const jwt = require("jsonwebtoken");

/**
 * User authentication middleware. Blocks users who are not logged in (no JWT)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //check for token
    if(!token) return res.status(401).send({ message: "You are not authorized to access this"});

    try {

    //verify token
    const decoded = jwt.verify(token, "TestJwtSecret");

    //Add user from payload
    req.user = decoded;
    next();
    }catch(e) {
        res.status(400).send({ message: "Token invalid"});

    }

}

module.exports = auth;