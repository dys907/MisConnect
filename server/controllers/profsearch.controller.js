const db = require("../models");
const Profsearch = db.profsearch;

//Create a new search
exports.create = (req, res) => {

    //validations
    if (!req.body) {
        res.status(400).send({ message: "Please fill out all fields" });
    }

    //creation
    const profsearch = new Profsearch({
        sender_name: req.body.sender_name,
        sender_age: req.body.sender_age,
        sender_city: req.body.sender_city,
        email: req.body.email,
        app: req.body.app,
        rec_name: req.body.rec_name,
        rec_age: req.body.rec_age,
        rec_city: req.body.rec_city,
        description: req.body.description,
        question: req.body.question,
        answer: req.body.answer
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

//Finds all profile searches from db (NOT USED MIGHT TAKE NAME)
// exports.findAll = (req, res) => {

//     const name = req.query.rec_name;
//     var condition = name ? { rec_name: { $regex: new RegExp(name), $options: "i" } } : {};

//     Profsearch.find(condition)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "There are no matches with these results."
//             })
//         })

// }

//Searches for receiver's name and the app they use.
exports.findAll = (req, res) => {

    //validate search query to have both fields filled
    if (req.query.rec_name == ""|| req.query.app == "") {
        return res.status(400).send({ message: "Please fill out all fields" });
    }

    let condition = { 
        rec_name: {$regex: new RegExp(req.query.rec_name), $options: "i" },
        app:{$regex: new RegExp(req.query.app), $options: "i" }
    }

    



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
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving id:" + id });
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

    const id = req.params.id;

    Profsearch.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `id: ${id} was not found, update unsuccessful`
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

    Profsearch.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `id: ${id} was not found, deletion unsuccessful`
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
