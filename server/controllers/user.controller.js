const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Creates new user
exports.create = (req, res) => {
    const {name, email, password, age, city, tinder, bumble, hinge} = req.body;

    //Validation fields
    if(!req.body) {
        return res.status(400).send({ message: "Please fill out required fields"})
    }
    
    if(age < 18) {;
        return res.status(400).send({ message: "Users must be over 18"});

    }

    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).send({ message: "User already exists"});

            const newUser = new User({
                email,
                password,
                name,
                age,
                city,
                tinder,
                bumble,
                hinge
            })

            //Create salt and hash used 10 as default

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser.save()
                    .then(user => {

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
                                    age: user.age,
                                    city: user.city,
                                    tinder: user.tinder,
                                    bumble: user.bumble,
                                    hinge: user.hinge
                                })
                            }
                            );
                    })
                })
            });
        })


}