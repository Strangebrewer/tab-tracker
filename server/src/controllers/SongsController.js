const db = require('../models');
const Op = db.Sequelize.Op;

module.exports = {
   async index(req, res) {
      try {
         let songs = null;
         const { search } = req.query;
         if (search) {
            songs = await db.Song.findAll({
               where: {
                  [Op.or]: [
                     'title', 'artist', 'genre', 'album'
                  ].map(key => ({
                     [key]: { [Op.like]: `%${search}%` }
                  }))
               }
            });
         } else {
            songs = await db.Song.findAll({ limit: 10 });
         }
         res.json(songs);
      } catch (err) {
         res.status(500).send({
            error: 'An error has occured trying to fetch songs.'
         })
      }
   },

   async show(req, res) {
      try {
         const song = await db.Song.findByPk(req.params.id);
         res.json(song);
      } catch (err) {
         res.status(500).send({
            error: 'An error has occured trying to fetch songs.'
         })
      }
   },

   async post(req, res) {
      try {
         const song = await db.Song.create(req.body)
         res.json(song);
      } catch (err) {
         res.status(500).send({
            error: 'An error has occured trying to create the song.'
         })
      }
   },

   async put(req, res) {
      try {
         await db.Song.update(req.body, { where: { id: req.params.id } });
         res.json(req.body);
      } catch (err) {
         res.status(500).send({
            error: 'An error has occured trying to update the song.'
         })
      }
   }
}