const express = require('express');
const app = express();
const env = app.get('env');
const config = require('./config')
const moment = require('moment');
const { Pool } = require('pg')
const pool = new Pool(config[env].postgre);
const queries = require('./queries');
const logger = require('./logger');
const axios = require('axios');
module.exports = {
  addWeatherData: async function() {
    let weatherData = await axios.get("https://api.openweathermap.org/data/2.5/weather?appid=f9d082a02abb985d3cea23277103fc79&id=1853909&units=metric");
    let {weather, main :{temp, temp_min, temp_max, humidity,
    }} = weatherData.data;
    const weatherId = weather.map(item => item.id).join(" ");
    let date = moment().format(config.dateString.postgreSearchQuery);
    logger.info("weatherID: " +weatherId + "date: " + date);
    const client = await pool.connect();
    const query = queries.addWeatherData;
    const param = [date, temp, temp_min, temp_max, humidity, weatherId]
    try {
        const result = await client.query(query, param);
        logger.info("add weatherData Success: " +result.toString());
    } catch (error) {
        logger.error(error.stack);
        logger.error("param" + param.toString());
    } finally {
        client.release()
    }
  },
  getTodayWeatherData: function(req, res, next) {
    // get Weather data from DB
    (async () => {
      let date = moment().format(config.dateString.temperature);
      // logger.debug("tempData: " +temp);
      
      res.json("");
    })().catch(next)
  },
  getWeatherDatas : async function(req, res, next) {
    const client = await pool.connect();
    const query = queries.getTemperatureDatas;
    // const param = [date, temp, 0]
    try {
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        logger.error(error.stack);
    } finally {
        client.release()
    }
  }
}
