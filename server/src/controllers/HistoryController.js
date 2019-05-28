const db = require('../models');
const Op = db.Sequelize.Op;
const _ = require('lodash');

module.exports = {
   async index(req, res) {
      try {
         const where = { UserId: req.user.id };
         const histories = await db.History
            .findAll({ where, include: [{ model: db.Song }] })
            .map(history => history.toJSON())
            .map(history => _.extend({}, history.Song, history));
         res.send(histories);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to find your history.'
         })
      }
   },

   async post(req, res) {
      try {
         const { songId: SongId } = req.body;
         const UserId = req.user.id;
         const history = await db.History.create({ SongId, UserId });
         res.json(history);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to create your history.'
         })
      }
   },

   async delete(req, res) {
      try {
         const UserId = req.user.id;
         const { id } = req.params;
         const history = await db.History.findOne({ where: { id, UserId } });
         if (!history) return res.status(403).send({
            error: 'You do not have access to this history.'
         });
         await history.destroy();
         res.send(history);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to delete your history.'
         })
      }
   }
}