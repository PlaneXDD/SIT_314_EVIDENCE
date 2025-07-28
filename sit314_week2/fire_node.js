const net = require("net");

const host = "127.0.0.1";
const port = 5000;

const client = net.createConnection(port, host, () => {
    console.log("[Fire Node] Connected to localhost:" + port);
    setInterval(() => {
        const area = "Mallee"; // Change as needed
        const fireLevels = ["None", "Advice", "Watch and Act", "Emergency"];
        const randomLevel = fireLevels[Math.floor(Math.random() * fireLevels.length)];

        const message = {
            type: "fire",
            area: area,
            value: randomLevel
        };
        client.write(JSON.stringify(message));
        console.log("[Fire Node] Sent:", JSON.stringify(message));
    }, 5000);
});

client.on("data", (data) => {
    console.log("[Fire Node] Received from server:", data.toString());
});

client.on("error", (err) => {
    console.error("[Fire Node] Error:", err.message);
});

client.on("close", () => {
    console.log("[Fire Node] Connection closed");
});
