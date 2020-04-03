const User = require('../models').User;
const UserEducation = require('../models').UserEducation;

module.exports = {

    // TODO update function signature to consume parameters instead of req,res
     getUserBasicInfo(req, res){
        // get user based on user id, include associated userEducation=current in the query
        return User.findByPk(
                req.params.userId, {
                        include: {
                            model:UserEducation,
                            as: 'userEducation',
                            where:{
                                current: true
                            }}})
                .then(userInfo => res.status(201).send(userInfo))
                .catch(error => res.status(400).send(error));
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
    addUserEducation(req, res){
        UserEducation
            .create({
                degreeName: req.body.degreeName,
                programName: req.body.programName,
                userId: req.body.userId,
                institutionId: req.body.institutionId,
                educationStartDate: req.body.educationStartDate,
                educationEndDate: req.body.educationEndDate,
                degreeLevel: req.body.degreeLevel,
                current: req.body.current
            })
            .then(userEducation => res.status(201).send(userEducation))
            .catch(error => res.status(400).send(error));
    },

    // TODO create functionality to display user experience and add/delete entries

    // TODO create functionality for display user skills and add/delete entries
};
