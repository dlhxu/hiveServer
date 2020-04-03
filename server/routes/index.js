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
    app.get('/api/userProfile/:userId', (req, res)=> {
        res.send(userProfileController.getUserBasicInfo(req.params.userId))
    });
};
