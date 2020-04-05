const UserTag = require('../models').UserTag;

module.exports = {

    /**
     * This method returns all the userTags (skills) associated with a user
     * @param userId user
     * @returns {Promise<Model[]>} array of userTags
     */
    getUserTags(userId){
       return UserTag.findAll({
                where:{
                    userId: userId
                }
            });
    },

    /**
     * This method creates a new userTag based on a given userId and a given tagId i.e. assigns a tag to a user
     * @param userId user
     * @param tagId tag (skill)
     * @returns {Promise<Model> | Domain | Promise<void> | * | Promise<Credential | null>} the created userTag
     */
    addNewUserTag(userId, tagId){
        return UserTag.create({
                tagId: tagId,
                userId: userId
            });
    },

    /**
     * This method deletes a userTag, i.e. dissociates a user with a particular skill
     * @param userId user
     * @param tagId tag (skill)
     * @returns {Promise<*>} number of deleted rows
     */
    async removeUserTag(userId, tagId){
            try {
                return await UserTag.destroy({
                    where: {
                        tagId: tagId,
                        userId: userId
                    }
                });
            } catch (e){ return e }
    },
};
