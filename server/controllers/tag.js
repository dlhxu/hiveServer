const Tag = require('../models').Tag;

module.exports = {

    /**
     * This method consumes no parameters and returns an array of all the tag objects in the database
     * @returns {Promise<Model[]>} array of Tag objects
     */
    getAllTags(){
        return Tag.findAll();
    },

    /**
     * This method returns a array of Tag objects given an array of tagNames
     * @param tagNames an array of tagNames
     * @returns {Promise<Model[]>}
     */
    getTags(tagNames){
        return Tag.findAll({
            where:{
                tagName: tagNames
            }
        });
    }
};
