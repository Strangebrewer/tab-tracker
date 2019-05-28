const { sequelize, Bookmark, History, Song, User } = require('../models');
const bcrypt = require('bcryptjs');

const songs_json = require('./songs.json');
const users_json = require('./users.json');
const bookmarks_json = require('./bookmarks.json');
const history_json = require('./history.json');

const users_with_hashed_passwords = users_json.map(user => {
   const new_password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
   user.password = new_password;
   return user;
})

sequelize.sync({ force: true }).then(async () => {
   await User.bulkCreate(users_with_hashed_passwords);
   await Song.bulkCreate(songs_json);
   await Bookmark.bulkCreate(bookmarks_json);
   await History.bulkCreate(history_json);
   process.exit(0);
});
