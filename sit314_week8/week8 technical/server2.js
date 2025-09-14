// server2.js
var weather = require('weather-js'); 
const express = require('express');
const app = express();
const port = 3010;

app.use(express.static('public'));

app.get('/', (req, res) => {
    weather.find({search: 'Melbourne, AU', degreeType: 'C'}, function(err, result) {
        const temp = result[0].current.temperature;
        let page = "<p>Smart-heating</p>";

        if(temp > 10) {
            page += `It's a warm ${temp}°C, turning heating off.`;
        } else {
            page += `It's a cold ${temp}°C, turning heating on.`;
        }

        res.send(page);
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
