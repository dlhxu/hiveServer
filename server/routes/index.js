const usersController = require('../controllers').users;
const userProfileController = require('../controllers').userProfile;
const institutionController = require('../controllers').institution;
const tagController = require('../controllers').tag;
const userTagsController = require('../controllers').userTag;
const jobPostingController = require('../controllers').jobPosting;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));

    //ROUTE TO ADD A NEW USER
    app.post('/api/users', (req, res) => {
        usersController.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    });

    //ROUTE TO CHECK IF USER EXISTS AND RETURN ID IF TRUE;
    app.get('/api/users/:email/:password', (req, res) => {
        usersController.findUser(req.params.email, req.params.password)
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    });

    //ROUTE TO ADD A NEW INSTITUTION
    app.post('/api/institution', (req, res) => {
        institutionController.findInstitution(req.body.institutionName)
            .then(institution => res.status(201).send(institution))
            .catch(error => res.status(400).send(error));
    });

    //ROUTE TO GET INSTITUTION NAME BASED ON ID
    app.get('/api/institution/:institutionId', (req, res) => {
        institutionController.getInstitutionName(req.params.institutionId)
            .then(institution => res.status(201).send(institution))
            .catch(error => res.status(400).send(error));
    });

    // USER PROFILE ROUTES

    // get a users basic info, provide userId in route
    app.get('/api/userProfile/:userId', (req, res) => {
        userProfileController.getUserBasicInfo(req.params.userId)
            .then(userInfo => res.status(200).send(userInfo))
            .catch(error => res.status(400).send(error));
    });

    // add a new education to a user
    app.post('/api/userProfile/:userId/newEducation', (req, res) => {
        userProfileController.addUserEducation(req.body, req.params.userId)
            .then(userEducation => res.status(200).send(userEducation))
            .catch(error => res.status(400).send(error));
    });

    // update a user's basic info (education info)
    app.put('/api/userProfile/:userId/updateEducation', (req, res) => {
        userProfileController.updateUserBasicInfo(req.body, req.params.userId)
            .then(numUpdated => res.status(200).send(numUpdated))
            .catch(error => res.status(400).send(error));
    });

    // delete a user's previous education info
    app.delete('/api/userProfile/:userId/removeEducation', (req, res) => {
        res.status(200).send(userProfileController.deleteUserEducation(req.body, req.params.userId))
            .catch (error => res.status(400).send(error));
    });

    // PREVIOUS POSITIONS

    // get all of a users previous positions
    app.get('/api/userProfile/:userId/previousPositions', (req, res) => {
        userProfileController.getUserPreviousPositions(req.params.userId)
            .then(previousPositions => res.status(200).send(previousPositions))
            .catch(error => res.status(400).send(error));
    });

    // add a previous position to a user
    app.post('/api/userProfile/:userId/previousPositions', (req, res) => {
        userProfileController.addUserPreviousPosition(req.body, req.params.userId)
            .then(previousPosition => res.status(200).send(previousPosition))
            .catch(error => res.status(400).send(error));
    });

    // update a user's previous position info (work experience info)
    app.put('/api/userProfile/:userId/previousPositions/:positionId', (req, res) => {
        userProfileController.updateUserPreviousPosition(req.body, req.params.userId, req.params.positionId)
            .then(numUpdated => res.status(200).send(numUpdated))
            .catch(error => res.status(400).send(error));
    });

    // delete a user's previous position info (work experience info)
    app.delete('/api/userProfile/:userId/previousPositions/:positionId', (req, res) => {
        res.status(200).send(userProfileController.deleteUserPreviousPosition(req.params.userId, req.params.positionId))
            .catch (error => res.status(400).send(error));

    });

    // TAGS

    // get all available tags
    app.get('/api/tags', (req, res) => {
        tagController.getAllTags()
            .then(tags => res.status(200).send(tags))
            .catch(error => res.status(400).send(error));
    });


    // USER SKILLS (userTags)

    // get all userTags (skills) associated with a user
    app.get('/api/userProfile/:userId/skills', (req, res) => {
        userTagsController.getUserTags(req.params.userId)
            .then(userTags => res.status(200).send(userTags))
            .catch(error => res.status(400).send(error));
    });

    // add a new userTag, ie associate a skill with a user
    app.post('/api/userProfile/:userId/skills/:tagId', (req, res) => {
        userTagsController.addNewUserTag(req.params.userId, req.params.tagId)
            .then(userEducation => res.status(200).send(userEducation))
            .catch(error => res.status(400).send(error));
    });

    // delete a user's userTag, ie dissociate a skill with a user
    app.delete('/api/userProfile/:userId/skills/:tagId', (req, res) => {
        res.status(200).send(userTagsController.removeUserTag(req.params.userId, req.params.tagId))
            .catch (error => res.status(400).send(error));
    });

    // JOB POSTINGS

    // get job postings that match tagIds
    app.get('/api/search', (req,res) => {
        jobPostingController.getJobsByTagIds(req.body.tagIds)
            .then(jobPostings => res.status(200).send(jobPostings))
            .catch(error => res.status(400).send(error));
    });

};
