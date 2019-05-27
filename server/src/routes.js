const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController');


module.exports = (app) => {
   app.post('/register',
      AuthenticationControllerPolicy.register,
      AuthenticationController.register
   );
   app.post('/login', AuthenticationController.login);

   app.get('/songs/:songId', SongsController.show);
   app.put('/songs/:id', SongsController.put);
   app.delete('/songs/:id', SongsController.deleteAll);
   
   app.get('/songs', SongsController.index);
   app.post('/songs', SongsController.post);
   app.delete('/songs', SongsController.deleteAll);


   app.get('/users', AuthenticationController.getAllUsers);
   app.delete('/users', AuthenticationController.deleteAllUsers);
}
