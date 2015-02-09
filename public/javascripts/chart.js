$(function () {
  
  var fileProcessingData = [],
      appMemoryData = [];
  
  chartData.forEach(function(x,i){
    var date = Date.parse(x.timestamp);
    fileProcessingData.push([date,x.timeMs]);
    appMemoryData.push([date,x.appMemoryUsageKb]);
  });
  
  $('#fileProcessingTimeChart').highcharts({
    chart: {
      type: 'areaspline'
    },
    title: {
      text: 'File processing stats'
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime'      
    },
    yAxis: {
      title: {
        text: 'File processing time'
      },
      units: 'ms'
    },
    tooltip: {
      shared: true
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    series: [{
      name: 'File processing time, ms',
      data: fileProcessingData
    }]
  });
  
  $('#appMemoryUseChart').highcharts({
    chart: {
      type: 'areaspline'
    },
    title: {
      text: 'Application memory usage stats'
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'App memory usage'
      }
    },
    tooltip: {
      shared: true
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    series: [{
      name: 'App memory usage, kb',
      data: appMemoryData
    }]
  });
});