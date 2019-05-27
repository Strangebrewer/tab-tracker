const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const routes = require('./routes');
const PORT = process.env.PORT || 8081;

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => {
      console.log(`API Server now listening on PORT ${PORT}`);
   });
});
