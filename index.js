const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});
app.post('/', function (req, res){
    const cityName = req.body.cityName;
    const apiKey = process.env.API_KEY;
    console.log(apiKey);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=" +apiKey+"&units=metric";
    https.get(url, function (response){
        response.on("data", function (data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
            res.write('<h1>Temperature: ' + temp + ' degree Celcius at '+ cityName +' </h1>');
            res.write('<p>Weather Description: ' + weatherDescription + '</p>');
            res.write('<img src=' + iconURL+ '>');
            res.send()
        });
    });
})




app.listen(4000, function (){
    console.log('Server started at 3000');
});