const User = require('../models').User;
const UserEducation = require('../models').UserEducation;
const PreviousPosition = require('../models').PreviousPosition;

module.exports = {

    /**
     * Consumes a userId and provides the user and usereducation info
     * @param userId
     * @returns {Promise<Model | null> | Promise<Model>} user info object and array of user education objects
     */
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

    /**
     * Consumes an object that contains key value pairs of user info fields
     * values to update to
     * Note: even fields that have not been changed will still apply the update function
     * Meant to save changes users make to their education info after clicking save
     * @param updates
     * @param userId
     * @returns {*} number of updated rows
     */
    updateUserBasicInfo(updates, userId){
        return UserEducation.update({
            degreeName: updates.degreeName,
            programName: updates.programName,
            institutionId: updates.institutionId,
            educationStartDate: updates.educationStartDate,
            educationEndDate: updates.educationEndDate,
            degreeLevel: updates.degreeLevel,
            current: updates.current
        }, {where: {
                degreeName: updates.degreeName,
                programName: updates.programName,
                userId: userId,
                institutionId: updates.institutionId,}})
    },

    /**
     *
     * @param educationInfo
     * @param userId
     * @returns {Promise<Model> | Domain | Promise<void> | * | Promise<Credential | null>} userEducation object
     */
    addUserEducation(educationInfo, userId){
        return UserEducation
                .create({
                    degreeName: educationInfo.degreeName,
                    programName: educationInfo.programName,
                    userId: userId,
                    institutionId: educationInfo.institutionId,
                    educationStartDate: educationInfo.educationStartDate,
                    educationEndDate: educationInfo.educationEndDate,
                    degreeLevel: educationInfo.degreeLevel,
                    current: educationInfo.current
                });
    },

    async deleteUserEducation(educationInfo, userId){
        try {
            return UserEducation.destroy({
                where: {
                    degreeName: educationInfo.degreeName,
                    programName: educationInfo.programName,
                    userId: userId,
                    institutionId: educationInfo.institutionId,
                }
            });
        } catch(e) {return e;}
    },

    // TODO create functionality to display user experience and add/delete entries

    /**
     * This method consumes a userId and provides all previous positions associated with this user
     * @param userId
     * @returns {Promise<Model[]>} an array of previous position objects
     */
    getUserPreviousPositions(userId){
        return PreviousPosition.findAll({
            where: {
                userId: userId
            }
        });
    },

    /**
     * This method creates a new previous position (job) for a user given the position info and userId
     * @param positionInfo
     * @param userId
     * @returns {Promise<Model> | Domain | Promise<void> | * | Promise<Credential | null>} previousPosition object
     */
    addUserPreviousPosition(positionInfo, userId){
        return PreviousPosition.create({
            userId: userId,
            positionName: positionInfo.positionName,
            positionDescription: positionInfo.positionDescription,
            companyName: positionInfo.companyName,
            positionStartDate: positionInfo.positionStartDate,
            positionEndDate: positionInfo.positionEndDate
        });
    },

    /**
     * This method consumes an object with key value pairs indicating new values for previous position fields
     * Requires a userId and a positionId to update
     * @param updates object
     * @param userId int
     * @param positionId int
     * @returns {*} number of updated rows
     */
    updateUserPreviousPosition(updates, userId, positionId){
        return PreviousPosition.update({
            positionName: updates.positionName,
            positionDescription: updates.positionDescription,
            companyName: updates.companyName,
            positionStartDate: updates.positionStartDate,
            positionEndDate: updates.positionEndDate
        }, {where: {
                userId: userId,
                positionId: positionId,
                }});
    },

    /**
     *
     * @param userId
     * @param positionId
     * @returns {*} number of rows deleted
     */
    async deleteUserPreviousPosition(userId, positionId){
        try {
            return await PreviousPosition.destroy({
                where: {
                    userId: userId,
                    positionId: positionId,
                }
            });
        } catch(e) {return e;}
    },

    // TODO create functionality for display user skills and add/delete entries
};
