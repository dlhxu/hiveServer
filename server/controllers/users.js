const User = require('../models').User;

module.exports = {
    create(req, res) {
        return User
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },

    findUser(req, res) {
        return User.findAll({
            limit: 1,
            where: {
                email: req.params.email,
                password: req.params.password
            }
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return User
            .findAll()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
};
