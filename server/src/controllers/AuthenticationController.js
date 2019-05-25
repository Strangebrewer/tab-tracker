const { User } = require('../models');

module.exports = {
   async register(req, res) {
      try {
         console.log('req.body:::', req.body);
         const user = await User.create(req.body)
         res.json(user);
      } catch (err) {
         res.status(400).send({
            error: 'This email account is already in user.'
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