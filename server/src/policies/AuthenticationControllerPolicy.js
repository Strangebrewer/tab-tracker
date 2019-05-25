const Joi = require('joi');

module.exports = {
   register(req, res, next) {
      const schema = {
         email: Joi.string().email(),
         password: Joi.string().regex(
            new RegExp('^[a-zA-Z0-9]{4,32}$')
         )
      }

      const { error, value } = Joi.validate(req.body, schema);

      if (error) {
         switch (error.details[0].context.key) {
            case 'email':
               return res.status(400).send({
                  error: 'You must provide a valid email address'
               })
            case 'password':
               return res.status(400).send({
                  error: 'shut up, honkey! Yo password\'s no good!'
               });
            default:
               return res.status(400).send({
                  error: 'Something went wrong, sucka!'
               })
         }
      }

      next();
   }
}