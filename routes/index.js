/*
 * ROUTES 
 */
var       fs = require('fs'),
        path = require('path'),
         csv = require('csv-streamify'),
      config = require('../modules/config'),
    analyzis = require('../modules/analyzis'),
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
 * POST /analyze
 */
exports.csvAnalyze = function(req, res) {
  req.pipe(req.busboy);
  req.busboy.on('file',function (fieldname, file, filename) {
    console.log("Uploading: " + filename); 

    var fileSize;
    file.on('data',function(data){
      fileSize = data.length;
    });

    var csvToJson = csv({
        delimiter: config.csvDelimiter, 
        empty:' ',
        objectMode: false
      },
      function(err, rows){
        if (err) {
          console.log('CSV parsing error '+err);
          res.status(500).send('CSV parsing error '+err)
          return;
        }
        /*CSV analyze*/
        var result = analyzis.tableStats(rows);

        /*Logging*/
        var startTime = req.start;
        var timeElapsed = Date.now() - startTime;
        var memoryUsage = process.memoryUsage().heapUsed/1024;
        logger.log({filename:filename,filesize: fileSize,timeMs:timeElapsed,appMemoryUsageKb:Math.round(memoryUsage)});

        res.render('analyze',{pageName:'Analyze results',result:result});
      }
    );
    
    file.pipe(csvToJson);
  })
}


/**
 * Statistics page
 * GET /stats
 */
exports.appStatistic = function(req, res) {
  fs.readFile('./log/'+config.logFileName, {encoding: 'utf-8'}, function(err,data){
    if (err){
      res.render('404',{pageName:err});
      return;
    }
    //I can't fix json log (missing commas between objects) problem in winston right now.
    //Will parse string values.
    //Todo: fix the problem.
    var result = data.replace(/{"filename/g,'@arrayseparator@{"filename').slice(16);
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