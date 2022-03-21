module.exports = (app) => {
    const users = require("../controllers/users.controller.js");
    const UserSchema = require('../schemas/users.schema');
    const { validate } = require('../middlewares/schemavalidator');

    var router = require("express").Router();

    router.post("/", validate(UserSchema), users.create);

    router.get("/", users.findAll);

    router.get("/:id", users.findOne);

    router.put("/:id", validate(UserSchema), users.update);

    app.use('/api/users', router);

};