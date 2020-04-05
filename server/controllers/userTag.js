const userTag = require('../models').UserTag;

module.exports = {
    findOrCreateTag(tagName) {
        return UserTag
            .findOrCreate({
                where: {tagName: tagName}
            })
    },
    list(req, res) {
        return UserTag
            .findAll()
            .then(UserTags => res.status(200).send(UserTags))
            .catch(error => res.status(400).send(error));
    },
};
