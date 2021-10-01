const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 8000;

const elevatorsRoute = require('./routes/elevator.js');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/api/elevators', elevatorsRoute);

app.get('/api', (req, res) => {
    res.send('api ');
})

app.listen(PORT);
console.log(`listening on port: ${PORT}`);

// app.use((err, req, res, next) => {
//   res.status(500).json(`Internal server error: ${err.message}`);
//   next();
// });
