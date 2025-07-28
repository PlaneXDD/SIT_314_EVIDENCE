const net = require("net");

const host = "127.0.0.1";
const port = 5000;

const client = net.createConnection(port, host, () => {
    console.log("[Warning Request] Connected to localhost:" + port);
    setInterval(() => {
        const area = "Mallee"; // Change to other CFA areas if needed

        const message = {
            type: "request",
            area: area,
            value: 0
        };
        const jsonMessage = JSON.stringify(message);
        client.write(jsonMessage);
        console.log("[Warning Request] Sent:", jsonMessage);
    }, 4000); // Every 4 seconds
});

client.on("data", (data) => {
    console.log("[Warning Request] Received from server:", data.toString());
});

client.on("error", (err) => {
    console.error("[Warning Request] Error:", err.message);
});

client.on("close", () => {
    console.log("[Warning Request] Connection closed");
});
