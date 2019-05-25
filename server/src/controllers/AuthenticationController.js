const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser(user) {
   const ONE_WEEK = 60 * 60 * 24 * 7;
   return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
   })
}

module.exports = {
   async register(req, res) {
      try {
         console.log('req.body:::', req.body);
         const user = await User.create(req.body)
         res.json(user);
      } catch (err) {
         res.status(400).send({
            error: 'This email account is already in use.'
         })
      }
   },

   async login(req, res) {
      try {
         const { email, password } = req.body;
         const user = await User.findOne({
            where: { email: email }
         });

         const login_error = { error: 'That\'s bogus info, doofy' }
         if (!user)
            return res.status(403).send(login_error)

         const isPasswordValid = user.comparePassword(password);
         if (!isPasswordValid)
            return res.status(403).send(login_error)

         res.json({ user, token: jwtSignUser(user.toJSON()) });
      } catch (e) {
         res.send({
            error: e
         })
      }
   },

   async getAllUsers(req, res) {
      try {
         const users = await User.findAll({});
         res.json(users)
      } catch (e) {

      }
   },

   async deleteAllUsers(req, res) {
      try {
         await User.destroy({
            where: {}
         });
         const users = await User.findAll({});
         res.json(users);
      } catch (e) {

      }
   }
}