const mongoose = require('mongoose');
const Sensor = require('./models/sensor');

// Connect once at the start (persistent connection)
mongoose.connect(
  'mongodb+srv://phamthienphu2604_db_user:930Ee56ufoCPNulF@cluster0.kw3mtie.mongodb.net/sit314?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Repeat every 1 second
setInterval(sensortest, 1000);

function sensortest() {
  const starttime = Date.now(); // Start timer

  const sensordata = {
    id: 0,
    name: "temperaturesensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: new Date(),
    temperature: 0
  };

  const low = 10;
  const high = 40;
  const reading = Math.floor(Math.random() * (high - low) + low);
  sensordata.temperature = reading;

  const newSensor = new Sensor({
    id: sensordata.id,
    name: sensordata.name,
    address: sensordata.address,
    time: sensordata.time,
    temperature: sensordata.temperature
  });

  newSensor.save().then(doc => {
    const endtime = Date.now(); // End timer
    console.log("⏱️ Save time (ms):", endtime - starttime);
    console.log("📦 Saved:", doc.temperature, "°C at", doc.time);
  }).catch(err => {
    console.error("❌ Save error:", err);
  });
}

// Do NOT close the connection — keep running
