const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 8081;

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./passport');

require('./routes')(app);

sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => {
      console.log(`API Server now listening on PORT ${PORT}`);
   });
});
