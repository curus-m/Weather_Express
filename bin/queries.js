module.exports = {
    addTemperatureData: `insert into temperature(date, temperature, humidity) values(to_timestamp($1, 'YYYY-MM-DD HH24:MI:00'), $2, $3)`,
    getTemperatureDatas: `select to_char(data.date, 'MM/DD HH24:MI') as time, 
      data.temperature, data.humidity from (select * from temperature order by date desc limit 72 offset 0) as data order by data.date asc`,
    getTemperatureMaxMins: `select max(temperature) as maxTemp, max(humidity) as maxHumidity, min(temperature) as minTemp, min(humidity) as minHumidity, 
    to_char(date, 'YYYY-MM-DD') as time from temperature where to_char(date, 'YYYY-MM-DD') between $1 and $2 group by to_char(date, 'YYYY-MM-DD') order by time asc`,
    addWeatherData : `insert into weather (date, temp, temp_min, temp_max, humidity, weatherId) values($1, $2, $3, $4, $5, $6)`,
    getDailyWeather: `select to_char(w.date, 'YYYY-MM-DD') as time, w.temp as temperature, w.humidity, w.temp_min as mintemp, w.temp_max as maxtemp, n.name as weathername, n.description as description, n.icon as icons
    from weather as w, weathername as n where left(w.weatherid,3)=n.id and w.date<now() - interval '1 day' order by w.date desc limit 8`
}