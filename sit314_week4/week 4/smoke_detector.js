// smoke_detector.js
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

// Set your unique topic for the detector
var topic = "/smoke_detectorID";

client.on('connect', () => {
    console.log('MQTT connected');

    setInterval(() => {
        // Generate a random smoke level between 0 and 20
        let smoke_level = Math.floor(Math.random() * 21); 
        let message = smoke_level.toString();

        client.publish(topic, message);
        console.log('Published to Topic: ' + topic + ' | Message: ' + message);
    }, 1000); // publish every second
});
