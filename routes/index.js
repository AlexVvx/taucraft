/**
 *
 * 
 * ROUTES
 *
 * 
 */
var       fs = require('fs'),
        path = require('path'),
         csv = require('csv-streamify'),
      config = require('../modules/config'),
     helpers = require('../modules/helpers'),
      logger = require('../modules/logger');


/**
 * Home index page
 * GET /
 */
exports.index = function(req, res) {
  res.render('index',{pageName:'Test project'});
}


/**
 * Analyze results page
 * POST /
 */
exports.csvAnalyze = function(req, res) {
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename); 

    var callback = function(err, rows) {
      if (err) {
        console.log('CSV parsing error '+err);
        res.status(500).send('CSV parsing error '+err)
        return;
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
        console.log(columnName + '|' + columnNonespacesStatistics + '|' + uniqueCharactersStatistics + '|' + dataType)
      })
      
      /*
       * 
       * Logging
       * 
       * 
       */
      var startTime = req.start;
      var timeElapsed = Date.now()-startTime;
      var memoryUsage = process.memoryUsage().heapUsed/1024;
      logger.log({filename:filename, timeMs:timeElapsed,memoryUsageKb:Math.round(memoryUsage)});
      
      res.render('analyze',{pageName:'Analyze results',result:result});
    }
    //
    var csvToJson = csv({delimiter: config.csvDelimiter, empty:' ',objectMode: false},callback);
    
    file.pipe(csvToJson);
  })
}


/**
 * Statistics page
 * GET /
 */
exports.appStatistic = function(req, res) {
  fs.readFile('./log/'+config.logFileName, {encoding: 'utf-8'}, function(err,data){
    if (err){
      res.render('404',{pageName:err});
      return;
    }
    //Я уперся в стену с парсингом лога winston. Похоже он не добавляет запятые между объектами json. 
    //Попробую простое и быстрое решение.
    //todo: fix this
    var result = data.replace(/{"filename/g,'@arrayseparator@{"filename').slice(16);
    console.log(result);
    var array = result.split('@arrayseparator@');
    result = [];
    array.forEach(function(x,i){
      try{
        var json = JSON.parse(x);
        result.push(json);
      }
      catch(err){
        res.render('404',{pageName:err});
        return;
      }
    })
    
    
    res.render('stats',{pageName:'Statistic', result: result});
  })
}

exports.emptyPage = function(req, res) {
    res.render('404',{pageName:'Page not found'});
}