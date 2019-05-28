const db = require('../models');
const Op = db.Sequelize.Op;
const _ = require('lodash');

module.exports = {
   async index(req, res) {
      try {
         const { songId } = req.query;
         const where = { UserId: req.user.id };
         if (songId) where.SongId = songId;
         const bookmarks = await db.Bookmark
            .findAll({ where, include: [{ model: db.Song }] })
            .map(bookmark => bookmark.toJSON())
            .map(bookmark => _.extend({}, bookmark.Song, bookmark));
         res.send(bookmarks);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to find that bookmarked song.'
         })
      }
   },

   async post(req, res) {
      try {
         const { songId: SongId } = req.body;
         const UserId = req.user.id;
         const bookmark = await db.Bookmark.findOne({ where: { SongId, UserId } });
         if (bookmark) return res.status(400).send({
            error: 'You already have this song bookmarked'
         });
         const newBookmark = await db.Bookmark.create({ SongId, UserId });
         res.json(newBookmark);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to create your bookmark.'
         })
      }
   },

   async delete(req, res) {
      try {
         const UserId = req.user.id;
         const { id } = req.params;
         const bookmark = await db.Bookmark.findOne({ where: { id, UserId } });
         if (!bookmark) return res.status(403).send({
            error: 'You do not have access to this bookmark.'
         });
         await bookmark.destroy();
         res.send(bookmark)
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to delete your bookmark.'
         })
      }
   }
}