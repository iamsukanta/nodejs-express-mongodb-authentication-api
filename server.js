const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const db = require('./configs/database.config')

// const userDomain = require('./app/models/user');

const app = express();


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {

  // var allowedOrigins = ['http://localhost:8080', 'http://localhost:8081',
  //   'https://iamsukanta.github.io', 'https://www.iamsukanta.github.io', 'http://www.iamsukanta.github.io',
  //   'http://iamsukanta.github.io'];
  // var origin = req.headers.origin;
  // if (allowedOrigins.indexOf(origin) > -1) {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  // }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Expose-Headers', 'Authorization');
  return next();
});


require('dotenv').config();

//Configure Mongoose
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })

const apiPrefix = process.env.API_PREFIX

// ------------------ importing route files ------------------------
const usersRouter = require('./app/http/routes/users.route')

//------------------------ api routes -------------------------------
app.use(apiPrefix + '/users', usersRouter)

module.exports = app
