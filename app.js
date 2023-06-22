const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    
    let zipCode = Number(req.body.zipCode);
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=70cd7dd0d5bc1e0cacd8ab40d13e221a&units=imperial`;
    
    https.get(url, function(response) {
        response.on("data", function(data) {
            res.setHeader('Content-Type', 'text/html');

            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const country = weatherData.sys.country;
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            
            res.write(`<h3>Location: ${city}, ${country} </h3> `);
            res.write(`<h3>Temperature: " ${temp} Fahrenheit</h3> `);
            res.write(`<h3>Weather Description: " ${weatherDescription}</h3>`);
            res.write(`<h3>Humidity: " ${humidity}</h3>`);
            res.write(`<h3>Wind Speed:: " ${windSpeed}</h3>`);
            res.send();
        })
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})