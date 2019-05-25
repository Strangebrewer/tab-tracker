const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');


module.exports = (app) => {
   app.post('/register',
      AuthenticationControllerPolicy.register,
      AuthenticationController.register
   );
   app.get('/users', AuthenticationController.getAllUsers);
   app.delete('/users', AuthenticationController.deleteAllUsers);
}
