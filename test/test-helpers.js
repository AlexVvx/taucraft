var helpers = require('../modules/helpers');

exports['isArray'] = function(test){
  test.equal(helpers.isArray(['string','string','string']),true);
  test.equal(helpers.isArray({}),false);
  test.equal(helpers.isArray('asdf'),false);
  test.equal(helpers.isArray('123'),false);
  test.equal(helpers.isArray(null),false);
  test.equal(helpers.isArray(true),false);
  test.equal(helpers.isArray(),false);
  test.done();
}

exports['nonespacesStatistics'] = function(test){
  test.equal(helpers.nonespacesStatistics(['string','string','string']),100);
  test.equal(helpers.nonespacesStatistics(['st   g','st   g','st   g']),50);
  test.equal(helpers.nonespacesStatistics(['asdfasdf    asdf']),75);
  test.equal(helpers.nonespacesStatistics([]),0);
  test.throws(function () { helpers.nonespacesStatistics(); });
  test.throws(function () { helpers.nonespacesStatistics(null); });
  test.throws(function () { helpers.nonespacesStatistics(true); });
  test.throws(function () { helpers.nonespacesStatistics({}); });
  test.throws(function () { helpers.nonespacesStatistics('asdf'); });
  test.throws(function () { helpers.nonespacesStatistics('123'); });
  test.done();
}

exports['uniqueCharactersStatistics'] = function(test){
  test.equal(helpers.uniqueCharactersStatistics(['abcde','fghij','klmno']),15);
  test.equal(helpers.uniqueCharactersStatistics(['aaaaa','bbbbb','ccccc']),3);
  test.equal(helpers.uniqueCharactersStatistics(['!@#$%^&*()']),10);
  test.equal(helpers.uniqueCharactersStatistics([]),0);
  test.throws(function () { helpers.uniqueCharactersStatistics(); });
  test.throws(function () { helpers.uniqueCharactersStatistics(null); });
  test.throws(function () { helpers.uniqueCharactersStatistics(true); });
  test.throws(function () { helpers.uniqueCharactersStatistics({}); });
  test.throws(function () { helpers.uniqueCharactersStatistics('asdf'); });
  test.throws(function () { helpers.uniqueCharactersStatistics('123'); });
  test.done();
}

exports['getDataType'] = function(test){
  test.equal(helpers.getDataType(['asdfg']),'string');
  test.equal(helpers.getDataType(['1234']),'number');
  test.equal(helpers.getDataType(['1234asdfg']),'number');
  test.equal(helpers.getDataType(['asdfg1234']),'string');
  test.equal(helpers.getDataType(['!@#$%^&*()']),'string');
  test.equal(helpers.getDataType(['January 8, 1999']),'date');
  test.equal(helpers.getDataType([]),null);
  test.throws(function () { helpers.getDataType(); });
  test.throws(function () { helpers.getDataType(null); });
  test.throws(function () { helpers.getDataType(true); });
  test.throws(function () { helpers.getDataType({}); });
  test.throws(function () { helpers.getDataType('asdf'); });
  test.throws(function () { helpers.getDataType('123'); });
  test.done();
}