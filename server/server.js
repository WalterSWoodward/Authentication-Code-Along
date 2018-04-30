const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

mongoose
  .connect('mongodb://localhost/auth')
  .then(cnn => {
    console.log('\n=== connected to mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.get('/', function(req, res) {
  res.send({ api: 'up and running' });
});

server.listen(5000, () => console.log('\n=== API on port 5k ===\n'));

// Class Question: Why don't you just run `yarn nodemon server.js` in the command line?
// Luis' Answer:  You could do this.  You would have to be sure that you installed nodemon globally though.
// As it is, you just install nodemon as a dev dependency and then type in the script 'start' command,
// and then you can just type `yarn start` to start your server.  Doing it this way means that you do
// not need to have nodemon globally installed on your system.
