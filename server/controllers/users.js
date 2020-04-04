const User = require('../models').User;

module.exports = {
    create(userInformation) {
        return User
            .create(userInformation)
    },

    findUser(email, password) {
        return User.findAll({
            limit: 1,
            where: {
                email: email,
                password: password
            }
            })

    },

    list(req, res) {
        return User
            .findAll()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
};
