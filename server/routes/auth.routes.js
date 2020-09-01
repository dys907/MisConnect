module.exports = app => {
  const userAuth = require("../controllers/auth.controller.js");
  const auth = require("../../server/middleware/auth");
  var router = require("express").Router();

  /**
* @route POST api/auth
* @desc Authenticates user
* @access Public
* @param {*} req 
* @param {*} res 
*/
  router.post("/", userAuth.create);

  // // Retrieve all Users
  // router.get("/", user.findAll);

  /**
* @route GET api/auth/user
* @desc Gets user data based on JWT token without password
* @access Private
* @param {*} req 
* @param {*} res 
*/
  router.get("/user", auth, userAuth.findOne);

  // // Update a User with id
  // router.put("/:id", user.update);

  // // Delete a User with id
  // router.delete("/:id", user.delete);

  // // Delete all users
  // router.delete("/", user.deleteAll);



  app.use('/api/auth', router);
};