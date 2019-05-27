const router = require('express').Router();

const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController');


router.post('/register',
   AuthenticationControllerPolicy.register,
   AuthenticationController.register
);

router.post('/login', AuthenticationController.login);

router.route('/songs/:id')
   .get(SongsController.show)
   .put(SongsController.put)
   .delete(SongsController.deleteAll);

router.route('/songs')
   .get(SongsController.index)
   .post(SongsController.post)
   .delete(SongsController.deleteAll);


router.route('/users')
   .get(AuthenticationController.getAllUsers)
   .delete(AuthenticationController.deleteAllUsers);

module.exports = router;