const User = require('../models').User;
const UserEducation = require('../models').UserEducation;

module.exports = {

    // TODO update function signature to consume parameters instead of req,res
     getUserBasicInfo(userId){
        // get user based on user id, include associated userEducation=current in the query
        return User.findByPk(
                userId, {
                    include: {
                        model:UserEducation,
                        as: 'userEducation',
                        where:{
                            current: true
                        }}});
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

    // TODO update function signature to consume parameters instead of req,res
    addUserEducation(educationInfo){
        return UserEducation
                .create({
                    degreeName: educationInfo.degreeName,
                    programName: educationInfo.programName,
                    userId: educationInfo.userId,
                    institutionId: educationInfo.institutionId,
                    educationStartDate: educationInfo.educationStartDate,
                    educationEndDate: educationInfo.educationEndDate,
                    degreeLevel: educationInfo.degreeLevel,
                    current: educationInfo.current
                });
    },

    // TODO create functionality to display user experience and add/delete entries

    // TODO create functionality for display user skills and add/delete entries
};
