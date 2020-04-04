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
    app.get('/api/userProfile/:userId', (req, res) => {
        userProfileController.getUserBasicInfo(req.params.userId)
            .then(userInfo => res.status(201).send(userInfo))
            .catch(error => res.status(400).send(error));
    });

    app.post('/api/userProfile/newEducation', (req, res) => {
        userProfileController.addUserEducation(req.body)
            .then(userEducation => res.status(201).send(userEducation))
            .catch(error => res.status(400).send(error));
    });

    app.put('/api/userProfile/:userId', (req, res) => {
        userProfileController.updateUserBasicInfo(req.body, req.params.userId)
            .then(userEducation => res.status(201).send(userEducation))
            .catch(error => res.status(400).send(error));
    });

};
