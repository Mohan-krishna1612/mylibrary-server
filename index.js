const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config/config");

/*------------Database connection----------*/
mongoose
    .connect(config.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        console.log("Mongodb Database is connected...");
    })
    .catch((err) => {
        console.log("Database is not connected...", err.message);
    });
/*------------Database connection----------*/



const app = express();
app.use(morgan("combined"));

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS, PATCH");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept"
    );
    next();
});

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);
require("./router/router")(app);

app.get('/', (req, res) => {
    res.send('Welcome to My Library ...')
})

app.listen(PORT, () => {
    console.log("Express server listening on port %d ", PORT);
})