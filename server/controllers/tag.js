const Tag = require('../models').Tag;

module.exports = {
    findOrCreateTag(tagName) {
        return Tag
            .findOrCreate({
                where: {tagName: tagName}
            })
    },
    list(req, res) {
        return Tag
            .findAll()
            .then(tags => res.status(200).send(tags))
            .catch(error => res.status(400).send(error));
    },
};
