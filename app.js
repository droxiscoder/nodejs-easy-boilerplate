const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
var logger = require("morgan");
const app = express();

require("dotenv").config();
const routes = require('./app/routes/index.routes');

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app)

module.exports = app;