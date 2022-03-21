const db = require("../models");
const Users = db.users;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const pick = require("../utils/pick");
const getPagination = require("../utils/pagination");

exports.create = async (req, res) => {

    try {

        let response = await Users.create(req.body, {
            logging: (sql, queryObject) => {
                console.log("query: " + JSON.stringify(sql));
                console.log("fields: " + JSON.stringify(queryObject.bind));
            }
        })

        res.send(response);

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: `Error creating user`
        });
    }

};

exports.findAll = async (req, res) => {

    const filterPagination = pick(req.query, ["page", "size"]);

    try {

        const { limit, offset } = getPagination(filterPagination.page, filterPagination.size);

        let response = await Users.findAndCountAll({
            limit,
            offset,
        })

        res.send(response);


    } catch (err) {
        console.log(err);
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    };
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {

        let response = await Users.findOne({
            where: { user_id: id }
        })

        res.send(response);

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error retrieving user with id=" + id
        });
    };
};

exports.update = async (req, res) => {

    const id = req.params.id;
    const user = req.body.user;

    try {

        await Users.update(user, {
            where: {
                user_id: id
            },
            logging: (sql, queryObject) => {
                console.log("query: " + JSON.stringify(sql));
                console.log("fields: " + JSON.stringify(queryObject.bind));
            }
        })


        res.send({
            message: "User was updated successfully."
        });


    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: `Cannot update User with id=${id}. Maybe User was not found or request is empty!`
        });
    }
};