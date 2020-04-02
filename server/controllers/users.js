const User = require('../models').User;

module.exports = {
    create(req, res) {
        console.log(req.body.firstname);
        return User
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
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
