const Institution = require('../models').Institution;

module.exports = {
    findInstitution(req, res) {
        return Institution
            .findOrCreate({
                where: {institutionName: req.body.institutionName}
            })
            .then(institution => res.status(201).send(institution))
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        console.log(req.body.institutionName);
        return Institution
            .create({
                institutionName: req.body.institutionName
            })
            .then(institution => res.status(201).send(institution))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Institution
            .findAll()
            .then(institutions => res.status(200).send(institutions))
            .catch(error => res.status(400).send(error));
    },
};
