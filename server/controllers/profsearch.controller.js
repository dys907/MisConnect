const db = require("../models");
const Profsearch = db.profsearch;

//Create a new search
exports.create = (req, res) => {

//validations
if(!req.body) {
    res.status(400).send({ message: "Please fill out all fields"});
}

//creation
const profsearch = new Profsearch({
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
    description: req.body.description
});

//save the profile search
profsearch
    .save(profsearch)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Your profile search was not queued."
        })
    })

}

//Finds all profile searches from db
exports.findAll = (req, res) => {

    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Profsearch.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "There are no matches with these results."
            })
        })

}

//Finds a search by ID
exports.findOne = (req, res) => {

    const id = req.params.id;

    Profsearch.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "No query exists with the id: " + id });
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving id:" + id});
        })
}

// Update the search query
exports.update = (req, res) => {
    //checks if update field is filled
    if (!req.body) {
        return res.status(400)
            .send({
                message: "Cannot update with empty fields"
            })
    }
    
    const id = req.param.id;

    Profsearch.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'id: ${id} was not found, update unsuccessful'
                })
            } else {
                res.send({
                    message: "profile search updated successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating profile search id: " + id
            })
        })

}

// Delete query by Id
exports.delete = (req, res) => {

    const id = req.params.id;

    Profsearch.findByIdandRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'id: ${id} was not found, deletion unsuccessful'
                })
            } else {
                res.send({
                    message: "profile search deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting profile search id: " + id
            })
        })

}

// Deletes all searches from database
exports.deleteAll = (req, res) => {

    Profsearch.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} profile searches were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all profile searches."
      })
    })
}

//not sure about this one
// exports.findAllPublished = (req, res) => {


// }