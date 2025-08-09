// smoke_alarm.js
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

// Topic must match the MQTT Output Node in Node-RED
var topic = "smoke/alarm";

client.on('connect', () => {
    client.subscribe(topic);
    console.log('Subscribed to smoke alarm');
});

client.on('message', (topic, message) => {
    console.log("Smoke Alert: " + message.toString());
});
