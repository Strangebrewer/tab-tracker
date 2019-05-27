const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController');
const BookmarksController = require('./controllers/BookmarksController');

module.exports = (app) => {
   app.post('/register',
      AuthenticationControllerPolicy.register,
      AuthenticationController.register
   );

   app.post('/login', AuthenticationController.login);

   app.route('/songs/:id')
      .get(SongsController.show)
      .put(SongsController.put)
      .delete(SongsController.deleteAll);

   app.route('/songs')
      .get(SongsController.index)
      .post(SongsController.post)
      .delete(SongsController.deleteAll);


   app.route('/users')
      .get(AuthenticationController.getAllUsers)
      .delete(AuthenticationController.deleteAllUsers);

   app.route('/bookmarks/:id')
      .delete(BookmarksController.delete)

   app.route('/bookmarks')
      .get(BookmarksController.index)
      .post(BookmarksController.post)
};