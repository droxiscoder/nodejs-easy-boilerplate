const { Router } = require("express");

module.exports = function (app) {
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to technical test application." });
    });

    require("./users.routes")(app);
};
