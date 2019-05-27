const db = require('../models');
const Op = db.Sequelize.Op;

module.exports = {
   async index(req, res) {
      console.log('req.query:::', req.query);
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
         console.log('err:::', err.message);
         res.status(500).send({
            error: 'An error has occured trying to fetch songs.'
         })
      }
   },

   async show(req, res) {
      console.log('req.params:::', req.params.id);
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
      console.log('req.body:::', req.body);
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
      console.log('req.body:::', req.body);
      try {
         await db.Song.update(req.body, { where: { id: req.params.id } });
         res.json(req.body);
      } catch (err) {
         res.status(500).send({
            error: 'An error has occured trying to create the song.'
         })
      }
   },

   async deleteAll(req, res) {
      try {
         const result = await db.Song.destroy({
            where: {}
         })
         console.log('result in deleteAll in Songs ctrl:::', result);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to delete all songs.'
         })
      }
   },

   async deleteOne(req, res) {
      try {
         const result = await db.Song.destroy({
            where: { id: req.params.id }
         })
         console.log('result in deleteOne in Songs ctrl:::', result);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to delete all songs.'
         })
      }
   },

   async template(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to do the thing.'
         })
      }
   }
}