const db = require('../models');
const Op = db.Sequelize.Op;

module.exports = {
   async index(req, res) {
      console.log('req.query in Bookmarks Index:::', req.query);
      try {
         const { songId, userId } = req.query;
         const bookmark = await db.Bookmark.findOne({
            where: {
               SongId: songId,
               UserId: userId
            }
         });
         res.send(bookmark);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to find that bookmarked song.'
         })
      }
   },

   async post(req, res) {
      try {
         const { songId, userId } = req.body;
         const bookmark = await db.Bookmark.findOne({
            where: {
               SongId: songId,
               UserId: userId
            }
         });

         if (bookmark) {
            return res.status(400).send({
               error: 'You already have this song bookmarked'
            })
         }

         const newBookmark = await db.Bookmark.create({
            SongId: songId,
            UserId: userId
         });
         res.json(newBookmark);
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to create your bookmark.'
         })
      }
   },

   async delete(req, res) {
      try {
         const { id } = req.params;
         const bookmark = await db.Bookmark.findByPk(id);
         await bookmark.destroy();
         res.send(bookmark)
      } catch (e) {
         res.status(500).send({
            error: 'An error has occured trying to delete your bookmark.'
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