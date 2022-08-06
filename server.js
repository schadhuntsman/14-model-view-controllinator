const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const route = require('./src/routes');
const withAuth = require('./src/utils/auth');
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require("./src/config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./src/utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set( 'view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', route)
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

