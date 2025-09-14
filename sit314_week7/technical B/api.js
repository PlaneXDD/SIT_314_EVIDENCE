const mongoose = require('mongoose');
const Sensor = require('./models/sensor'); 
const express = require('express');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://testuser:260403@cluster0.kw3mtie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use(express.json());

// GET all
app.get('/', async (req, res) => {
    const all = await Sensor.find({});
    res.send(all);
});

// GET by ID
app.get('/:id', async (req, res) => {
    const data = await Sensor.find({ _id: req.params.id });
    res.send(data);
});

// POST
app.post('/', async (req, res) => {
    const reading = Math.floor(Math.random() * (40 - 10) + 10);
    const newSensor = new Sensor({
        name: "temperaturesensor",
        address: "221 Burwood Hwy, Burwood VIC 3125",
        time: Date.now(),
        temperature: reading
    });

    await newSensor.save();
    res.send('Added Data!');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
