const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');
const passport = require('passport');
const rootRoutes = require('./routes/rootRoutes');
const todoRoutes = require('./routes/todoRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e) => {
    if (e) console.log(e);
    console.log('Connected to MongoDB!');
  }
);

//---------------------------MIDDLEWARE--------------------------//

app.use(
  cors({
    origin: 'http://localhost:3000', //React location
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//---------------------------END MIDDLEWARE--------------------------//

//Routes
app.use('/', rootRoutes, todoRoutes);
//End Routes

app.listen(port, () => {
  console.log(`Hosting on port ${port}`);
});
