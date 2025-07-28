const net = require("net");

const host = "127.0.0.1";
const port = 5000;

const client = net.createConnection(port, host, () => {
    console.log("[Rain Node] Connected to localhost:" + port);
    setInterval(() => {
        const area = "Mallee"; // Change to appropriate CFA area
        const rain = Math.floor(Math.random() * 100) + 1;
        const message = {
            type: "rain",
            area: area,
            value: rain
        };
        client.write(JSON.stringify(message));
        console.log("[Rain Node] Sent:", JSON.stringify(message));
    }, 3000);
});

client.on("data", (data) => {
    console.log("[Rain Node] Received from server:", data.toString());
});

client.on("error", (err) => {
    console.error("[Rain Node] Error:", err.message);
});

client.on("close", () => {
    console.log("[Rain Node] Connection closed");
});
