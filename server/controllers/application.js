const Application = require('../models').Application;
const JobPosting = require('../models').JobPosting;

module.exports = {

    /**
     * This method returns all of the users saved, in progress, and completed job applications and their associated job postings
     * @param userId user
     * @returns {Promise<Model[]>} array of Application objects and their associated jobPosting objects
     */
    getAllUserApplications(userId){
        return Application.findAll({
            where:{
                userId: userId
            }, include:{
                model: JobPosting
            }
        });
    },

    getSavedApplications(userId){
        return Application.findAll({
            where:{
                userId: userId,
                applicationStatus: 'Saved'
            }, include:{
                model: JobPosting
            }
        });
    },

    getInProgressApplications(userId){
        return Application.findAll({
            where:{
                userId: userId,
                applicationStatus: 'In Progress'
            }, include:{
                model: JobPosting
            }
        });
    },

    getCompletedApplications(userId){
        return Application.findAll({
            where:{
                userId: userId,
                applicationStatus: 'In Progress'
            }, include:{
                model: JobPosting
            }
        });
    },

    // TODO create functionality to let a user apply to a job i.e. create a new Application instance with status "in progress"
    /**
     * This method creates a new "in progress" application instance for a given userId and jobPosting object
     * @param userId user
     * @param jobPosting JobPosting object
     * @returns {Promise<Model> | Domain | Promise<void> | * | Promise<Credential | null>} Application object
     */
    createNewUserApplication(userId, jobPosting){
        return Application.create({
            userId: userId,
            jobId: jobPosting.jobId,
            employerId: jobPosting.jobId,
            applicationStatus: "In Progress"
        })
    },

    // TODO create functionality to let a user save a job i.e. create a new Application instance with status "saved"
    /**
     * This method creates a new "saved" application instance for a given userId and jobPosting object
     * @param userId user
     * @param jobPosting JobPosting object
     * @returns {Promise<Model> | Domain | Promise<void> | * | Promise<Credential | null>} Application object
     */
    createNewUserSavedJob(userId, jobPosting){
        return Application.create({
            userId: userId,
            jobId: jobPosting.jobId,
            employerId: jobPosting.jobId,
            applicationStatus: "Saved"
        })
    },

    // TODO create functionality to let a user unsave a job i.e. destroy an Application instance"
    /**
     * This method unsaves a job from a users list of applications
     * @param userId user
     * @param application Application object
     * @returns {Promise<*>} number of affected rows
     */
    async deleteUserSavedJob(userId, application){
        try {
            return Application.destroy({
                where: {
                    userId: userId,
                    jobId: application.programName,
                    employerId: application.employerId,
                    applicationId: application.institutionId,
                }
            });
        } catch(e) {return e;}
    },

    // TODO create functionality to let a user update status of job to "applied"
    /**
     * this method updates the status of a particular application to "Complete"
     * @param userId user
     * @param application Application object
     * @returns {*} number of affected rows
     */
    completeApplication(userId, application){
        return Application.update({
            applicationStatus: "Complete"
        }, {
            where:{
                userId: userId,
                jobId: application.jobId,
                employerId: application.jobId,
                applicationId: application.institutionId
            }
        });
    }


};
