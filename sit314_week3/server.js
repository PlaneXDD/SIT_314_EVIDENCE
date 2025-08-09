const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

const topic = "/myid";

client.on('connect', () => {
    client.subscribe(topic);
    console.log('mqtt connected and subscribed to: ' + topic);
});

client.on('message', (topic, message) => {
    console.log("Topic is: " + topic);
    console.log("Message is: " + message.toString());
});
