const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
var logger = require("morgan");
const app = express();

var http = require('http');

require("dotenv").config();
const routes = require('./app/routes/index.routes');

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app)

const PORT = process.env.PORT || 3000;

var httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
