const usersController = require('../controllers').users;
const userProfileController = require('../controllers').userProfile;
module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));

    //ROUTE TO ADD A NEW USER
    app.post('/api/users', usersController.create);

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
