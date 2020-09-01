const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../../server/middleware/auth.js");

/**
 * @route POST api/auth
 * @desc Auth user
 * @access Public
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    const {email, password} = req.body;

    //Validation fields
    if(!req.body) {
        return res.status(400).send({ message: "Please fill out required fields"})
    }

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).send({ message: "User does not exists"});

           
            //Validate the password

            bcrypt.compare(password, user.password)
                .then(match => {
                    if(!match) return res.status(400).send({message: "Password Incorrect"});

                    jwt.sign({
                        id: user.id},
                        "TestJwtSecret",
                        (err, token) => {
                            if(err) throw err;
                            res.send({
                                token,
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            })
                        });
                })
        })
}


/**
 * @route GET api/auth/user
 * @desc Get user data without the password
 * @access Private
 * @param {*} req 
 * @param {*} res 
 */
exports.findOne = (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
}