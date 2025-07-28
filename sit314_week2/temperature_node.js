const net = require('net');

const HOST = 'localhost';
const PORT = 5000;

// Change this to your desired region, e.g., 'Mallee', 'Central', 'North East', etc.
const area = 'Mallee';

// Create a TCP client connection
const client = net.createConnection(PORT, HOST, () => {
  console.log('[Temperature Node] Connected to ' + HOST + ':' + PORT);

  // Send data every 2 seconds
  setInterval(() => {
    const temperature = (Math.random() * 20 + 10).toFixed(1); // e.g., 10.0 to 30.0
    const message = JSON.stringify({
      type: 'temperature',
      area: area,
      value: parseFloat(temperature)
    });

    console.log('[Temperature Node] Sent:', message);
    client.write(message);
  }, 2000);
});

// Handle data received from server
client.on('data', (data) => {
  console.log('[Temperature Node] Received from server:', data.toString());
});

// Handle connection closed
client.on('end', () => {
  console.log('[Temperature Node] Connection closed');
});

// Handle errors
client.on('error', (err) => {
  console.error('[Temperature Node] Error:', err.message);
});
