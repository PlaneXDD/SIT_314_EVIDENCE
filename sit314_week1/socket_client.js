// socket_client.js
const net = require("net");

const host = "127.0.0.1"; // Or replace with server IP if remote testing
const port = 5000;

const operations = ["add", "sub", "mul", "div"];

const client = net.createConnection(port, host, () => {
    console.log("Connected to server");

    // Send random command every 1 second
    setInterval(() => {
        const op = operations[Math.floor(Math.random() * operations.length)];
        const rand1 = Math.floor(Math.random() * 100);
        const rand2 = Math.floor(Math.random() * 100) + 1; // avoid 0 in division
        const message = `${op},${rand1},${rand2}`;
        console.log(`Sending: ${message}`);
        client.write(message);
    }, 1000);
});

client.on("data", (data) => {
    console.log(`Received from server: ${data.toString()}`);
    // Commented to keep client alive
    // process.exit(0);
});

client.on("error", (error) => {
    console.log(`Error: ${error.message}`);
});

client.on("close", () => {
    console.log("Connection closed");
});
