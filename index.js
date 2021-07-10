const express = require("express");
const https = require("https");
const app = express();

app.get('/', function (req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Tongi&appid=ee112f9614166746b534d124ea0cdb53&units=metric";
    https.get(url, function (response){
        response.on("data", function (data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherDescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
            console.log(icon);
            res.write('<h1>Temperature: ' + temp + ' degree Celcius at Tongi</h1>');
            res.write('<p>Weather Description: ' + weatherDescription + '</p>');
            res.write('<img src=' + iconURL+ '>');
            res.send()
        });
    });
});


app.listen(3000, function (){
    console.log('Server started at 3000');
});