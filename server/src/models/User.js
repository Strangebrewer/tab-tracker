const bcrypt = require('bcryptjs');

function hashPassword(user, options) {
   if (!user.changed('password')) return;

   const new_password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
   return user.setDataValue('password', new_password)
}

module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('User', {
      email: {
         type: DataTypes.STRING,
         unique: true
      },
      password: DataTypes.STRING
   },
      {
         hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
         }
      }
   )

   User.prototype.comparePassword = function (password) {  
      return bcrypt.compareSync(password, this.password)
   }

   return User;
}
