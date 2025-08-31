const axios = require('axios');

axios.get('http://localhost:3000/sensorData')
  .then(response => {
    const sensorData = response.data;
    console.log(sensorData);
    console.log(sensorData.id);
    console.log(sensorData.name);
    console.log(sensorData.address);
    console.log(sensorData.time);
    console.log(sensorData.temperature);
  })
  .catch(error => {
    console.error('Error:', error);
  });
