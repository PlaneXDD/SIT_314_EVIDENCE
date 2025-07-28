const net = require("net");
const port = 5000;

let temp;
let wind;
let rain;

const server = net.createServer((socket) => {
    console.log("Client connected");

    socket.on("data", (data) => {
        const strData = data.toString();
        console.log(`Received: ${strData}`);

        const command = strData.split(",");
        const name = command[0];
        const value = parseFloat(command[1]);
        let result;

        switch (name) {
            case "temp":
                temp = value;
                result = "ok";
                break;
            case "rain":
                rain = value;
                result = "ok";
                break;
            case "wind":
                wind = value;
                result = "ok";
                break;
            case "request":
                if (temp > 20 && rain < 50 && wind > 30) {
                    result = "Weather Warning";
                } else {
                    result = "Everything fine";
                }
                break;
        }

        socket.write(result.toString());
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.log(`Socket Error: ${error.message}`);
    });
});

server.on("error", (error) => {
    console.log(`Server Error: ${error.message}`);
});

server.listen(port, () => {
    console.log(`TCP socket server is running on port: ${port}`);
});
