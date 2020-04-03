const User = require('../models').User;
const UserEducation = require('../models').UserEducation;

module.exports = {
    // TODO create functionality for "Display users basic information"

    /**
     * This method returns an object containing basic user info
     * The returned object contains an array of objects education, which
     * contains all user education instances associated with the provided userId
     * @param userId used to find relevant model instances
     */
    async getUserBasicInfo(userId){
        // get user based on user id, include associated userEducation=current in the query
        const userInfo = await User.findByPk(
            userId, {
                include: {
                    model: UserEducation,
                    as: 'education',
                    where:{
                        current: true
                    }}});
        return {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            graduationDate: userInfo.education[0].educationEndDate,
            degreeLevel: userInfo.education[0].degreeLevel,
            program: userInfo.education[0].program,
        }

    },
    // TODO create functionality to edit users basic information

    /**
     * Consumes an object that contains key value pairs of user info fields
     * values to update to
     * Note: even fields that have not been changed will still apply the update function
     * @param updates
     */
    updateUserBasicInfo(updates){

    },

    // TODO create functionality to display user experience and add/delete entries

    // TODO create functionality for display user skills and add/delete entries
};
