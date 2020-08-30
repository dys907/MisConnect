module.exports = app => {
    const profsearch = require("../controllers/profsearch.controller.js");
  
    var router = require("express").Router();
  
    // Create a new profile search
    router.post("/", profsearch.create);
  
    // Retrieve all profile search
    router.get("/", profsearch.findAll);
  
    // Retrieve a single profile search with id
    router.get("/:id", profsearch.findOne);
  
    // Update a profile search with id
    router.put("/:id", profsearch.update);
  
    // Delete a profile search with id
    router.delete("/:id", profsearch.delete);
  
    // Create a new profile search
    router.delete("/", profsearch.deleteAll);
  


    app.use('/api/profsearch', router);
  };