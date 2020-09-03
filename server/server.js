const express = require("express");
const cors = require("cors");
const { Mongoose } = require("mongoose");

const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//connect mongodb
const db = require("./models");

console.log(db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.log("Cannot connect to the database", err);
    process.exit();
  })

// simple route
app.get("/", (req, res) => {
  res.send("Hello World");
});

require("./routes/profsearch.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});