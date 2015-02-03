var winston = require('winston'),
     config = require('./config');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ 
      filename: './log/'+config.logFileName,
      json: true,
      stringify: true
    })
  ]
});

exports.log = function(object){
  logger.log('info', 'Log Message', object);
}