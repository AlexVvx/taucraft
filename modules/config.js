var nconf = require('nconf');
var fs = require('fs');

nconf.argv()
     .env();

var filename = 'config.json';

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