const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController');
const BookmarksController = require('./controllers/BookmarksController');
const HistoryController = require('./controllers/HistoryController');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
   app.post('/register',
      AuthenticationControllerPolicy.register,
      AuthenticationController.register
   );

   app.post('/login', AuthenticationController.login);

   app.route('/songs/:id')
      .get(SongsController.show)
      .put(SongsController.put);

   app.route('/songs')
      .get(SongsController.index)
      .post(SongsController.post);

   app.route('/bookmarks/:id')
      .delete(isAuthenticated, BookmarksController.delete);

   app.route('/bookmarks')
      .get(isAuthenticated, BookmarksController.index)
      .post(isAuthenticated, BookmarksController.post);

   app.route('/histories/:id')
      .delete(isAuthenticated, HistoryController.delete);

   app.route('/histories')
      .get(isAuthenticated, HistoryController.index)
      .post(isAuthenticated, HistoryController.post);
};