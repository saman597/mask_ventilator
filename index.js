const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppErrorHandler = require('./config/errorHandler');

//Start express app
const app = express();

//Global Middlewares
app.use(cors()); //for CORS

app.options('*', cors());

// Req meta-data development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static('public'));

// Body-parsing , reading data from body into req.body
app.use(express.json()); 

//Mounting the router
app.use('/api/v1/users' , require('./routes/userRoutes'));
app.use('/api/v1/masks' , require('./routes/maskRoutes'));
app.use('/api/v1/ventilators' , require('./routes/ventilatorRoutes'));

// Handling Unhandled Routes 
app.all('*', (req, res, next) => { 
  next(
    new AppErrorHandler(`Can't find ${req.originalUrl} on this server.`, 404)
  );
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      success: false,
      message: 'Not authenticated.'
    });
  }
});

module.exports = app;
