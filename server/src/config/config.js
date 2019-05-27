const path = require('path');

module.exports = {
   db: {
      database: process.env.DB_NAME || 'tab_tracker',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'test',
      options: {
         dialect: process.env.DIALECT || 'mysql',
         host: process.env.HOST || 'localhost'
      }
   },
   authentication: {
      jwtSecret: process.env.JWT_SECRET || 'howling at the moons'
   }
}
