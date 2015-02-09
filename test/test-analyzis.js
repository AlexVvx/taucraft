var analyzis = require('../modules/analyzis');

exports['tableStats'] = function(test){
  test.throws(function () { analyzis.tableStats(); });
  test.throws(function () { analyzis.tableStats(null); });
  test.throws(function () { analyzis.tableStats(true); });
  test.throws(function () { analyzis.tableStats({}); });
  test.throws(function () { analyzis.tableStats([]); });
  test.throws(function () { analyzis.tableStats('asdf'); });
  test.throws(function () { analyzis.tableStats('123'); });
  test.done();
}