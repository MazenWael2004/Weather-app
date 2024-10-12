import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));


app.listen(3000,()=>{
    console.log(`Server running on port ${port}`);
});

app.get("/",(req,res)=>{
res.render("index.ejs");
});

 app.post("/current",async (req,res)=>{
    
    const LOCATION = req.body["location-entered"];
    const response = await axios.get("https://api.weatherapi.com/v1/current.json?key=7777ee7e03ce4d25aff171606240110&q="+LOCATION);
    const data = response.data;
    const datalocation = data.location;
    const city = datalocation.name;
    const degreeCel = data.current.temp_c;
    const WeatherCondition = data.current.condition.text;
    const WindSpeed = data.current.wind_kph;
    const Humidity = data.current.humidity;
    const ISDAY = data.current["is_day"];
    res.render("index.ejs",{
        Data:data,
        City:city,
        DegreeCelsius:degreeCel,
        weathercondition:WeatherCondition,
        windspeed:WindSpeed,
        humidity:Humidity,
        isDay: ISDAY,
    });

    console.log(WeatherCondition);

 });


app.use(express.static("public"));