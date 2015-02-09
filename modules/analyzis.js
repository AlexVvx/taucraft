var helpers = require('./helpers');

exports.tableStats = function(rows){
  if (!helpers.isArray(rows) || rows.length===0){
    throw new Error('Expected not empty array');
  }

  var headlines, 
      columns = [],
      result = [];

  rows.forEach(function (row,i) {
    if (i===0){
      headlines = row.slice(0);
      console.log('headlines '+headlines.join());
    }
    else {
      if (i===1){
        //columns initialization
        row.forEach(function(x,n){
          columns[n] = [];
          columns[n].push(x);
        })
      }
      else{
        row.forEach(function(x,n){
          columns[n].push(x);
        })
      }
    }
  })
  columns.forEach(function(column,i){
    var columnName = headlines[i];
    var columnNonespacesStatistics = helpers.nonespacesStatistics(column);
    var uniqueCharactersStatistics = helpers.uniqueCharactersStatistics(column);
    var dataType = helpers.getDataType(column);
    var resultRow = {
      name: columnName,
      nonespaces: columnNonespacesStatistics,
      uniquecharacters: uniqueCharactersStatistics,
      datatype: dataType
    }
    result.push(resultRow);
    console.log(columnName + '|' + columnNonespacesStatistics + '|' + uniqueCharactersStatistics + '|' + dataType);
  })
  return result;
}