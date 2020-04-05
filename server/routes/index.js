const usersController = require('../controllers').users;
const userProfileController = require('../controllers').userProfile;
const institutionController = require('../controllers').institution;

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

    app.post('/api/todos', usersController.create);

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

    // delete a user's previous position info (work experience info)
    app.delete('/api/userProfile/:userId/removeEducation', (req, res) => {
        res.status(200).send(userProfileController.deleteUserEducation(req.body, req.params.userId))
            .catch (error => res.status(400).send(error));
    });

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

};
