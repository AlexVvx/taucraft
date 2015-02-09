var nconf = require('nconf'),
       fs = require('fs');

var filename = 'config.json';

nconf.argv().env();

console.log('Reading configuration from '+filename);

if(!fs.existsSync(filename)) {
  console.log('Please make sure that config file exists.');
  process.exit();
}
else {
  nconf.file({ file: filename });
  var config = nconf.get('config');

  module.exports = config;
}