const net = require('net');

const PORT = 5000;

const weatherData = {
  'Central': {},
  'East Gippsland': {},
  'Mallee': {},
  'North Central': {},
  'North East': {},
  'Northern Country': {},
  'South West': {},
  'West and South Gippsland': {},
  'Wimmera': {}
};

const server = net.createServer((socket) => {
  console.log('New connection established');

  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`[Server] Received message: ${message}`);

    try {
      const parsed = JSON.parse(message);

      const { type, area, value } = parsed;

      if (!type || !area || value === undefined) {
        console.log(`Invalid message format`);
        socket.write('ERROR: Invalid JSON format');
        return;
      }

      if (!weatherData[area]) {
        console.log(`Unknown area: ${area}`);
        socket.write('ERROR: Unknown area');
        return;
      }

      weatherData[area][type] = value;
      console.log(`[Server] Updated ${type} in ${area} to ${value}`);
      socket.write('OK');
    } catch (err) {
      console.log(`Invalid message received: ${message}`);
      socket.write('ERROR: Invalid message format');
    }
  });

  socket.on('error', (err) => {
    console.error(`Socket error: ${err.message}`);
  });

  socket.on('close', () => {
    console.log('Connection closed');
  });
});

server.listen(PORT, () => {
  console.log(`🌤️ Weather server running on port ${PORT}`);
});
