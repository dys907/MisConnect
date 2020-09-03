module.exports = app => {
  const profsearch = require("../controllers/profsearch.controller.js");
  var router = require("express").Router();

  /**
* @route POST api/profsearch
* @desc Create a profile search
* @access Public
* @param {*} req 
* @param {*} res 
*/
  router.post("/", profsearch.create);


  /**
* @route Get api/profsearch
* @desc Get all profile searches available
* @access Public
* @param {*} req 
* @param {*} res 
*/
  // router.get("/", profsearch.findAll);

  /**
   * @route GET api/profsearch
   * @desc Search for name and app parameters
   * @access Public
   * @param {*} req 
   * @param {*} res 
   */
  router.get("/", profsearch.findAll);

  /**
   * @route GET api/profsearch
   * @desc Get a profile search based on the id
   * @access Public
   * @param {*} req 
   * @param {*} res 
   */
  router.get("/:id", profsearch.findOne);

  /**
* @route PUT api/profsearch/id
* @desc Update a profile search by id
* @access Public
* @param {*} req 
* @param {*} res 
*/
  router.put("/:id", profsearch.update);


  /**
* @route DELETE api/profsearch/id
* @desc Delete a profile search by id
* @access Private
* @param {*} req 
* @param {*} res 
*/
  router.delete("/:id", profsearch.delete);

  /**
* @route DELETE api/profsearch/
* @desc Delete all profile searches
* @access Private
* @param {*} req 
* @param {*} res 
*/
  router.delete("/", profsearch.deleteAll);



  app.use('/api/profsearch', router);
};