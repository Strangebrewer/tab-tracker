const db = require('../models');

module.exports = {
   async index(req, res) {
      try {
         const songs = await db.Song.findAll({});
         res.json(songs);
      } catch (err) {
         res.status(500).send({
            error: 'An error has occured trying to fetch songs.'
         })
      }
   },

   async show(req, res) {
      console.log('req.params:::', req.params.songId);
      try {
         const song = await db.Song.findByPk(req.params.songId);
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