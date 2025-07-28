const net = require("net");

const host = "127.0.0.1";
const port = 5000;

const client = net.createConnection(port, host, () => {
    console.log("[Wind Node] Connected to localhost:" + port);
    setInterval(() => {
        const area = "Mallee"; // Change as needed
        const wind = Math.floor(Math.random() * 100) + 1;
        const message = {
            type: "wind",
            area: area,
            value: wind
        };
        client.write(JSON.stringify(message));
        console.log("[Wind Node] Sent:", JSON.stringify(message));
    }, 3000);
});

client.on("data", (data) => {
    console.log("[Wind Node] Received from server:", data.toString());
});

client.on("error", (err) => {
    console.error("[Wind Node] Error:", err.message);
});

client.on("close", () => {
    console.log("[Wind Node] Connection closed");
});
