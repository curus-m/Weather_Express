const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const schedule = require('node-schedule');
const temperature = require('./bin/temperature');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./bin/graphql/schema');
const graphqlResolver = require('./bin/graphql/resolver');
const weather = require('./bin/weather');
const indexRouter = require('./routes/index');
const app = express();
const logger = require('./bin/logger');
const env = app.get('env');
const moment = require('moment');
const config = require('./bin/config');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// set temperature check
const addTemperatureJob = schedule.scheduleJob("0 */20 * * * *", async function () {
  if(env == "production") {
    temperature.addTempData();
  } else {
    logger.info("thermometer check skipped on"+ moment().format(config.dateString.temperature));
  }
});

const addWeatherJob = schedule.scheduleJob("0 0 9 * * *", async function () {
  if(env == "production") {
    weather.addWeatherData();
  } else {
    logger.info("weather check skipped on"+ moment().format(config.dateString.temperature));
  }
}); 

//setup graphQL
app.use(
  '/temperature',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: env === 'development'
  }),
);
app.use(
  '/weather',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: env === 'development'
  }),
);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
