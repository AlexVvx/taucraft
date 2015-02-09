/*
 * gets one column, returns number from 0 to 100
 */
exports.nonespacesStatistics = function(column) {
  var total = 0,
      spaces = 0,
      nonSpaceOccupancy;
      
  column.forEach(function(x,i){
    total += x.length;
    var matchesArray = x.match(/\s/g);
    if (matchesArray){
      spaces += matchesArray.length
    }
  })
  
  nonSpaceOccupancy = Math.round(100 - (spaces / total * 100));
  return nonSpaceOccupancy
}


/*
 * gets one column, returns number
 */
exports.uniqueCharactersStatistics = function(column) {
  var uniqueCount = 0,
      uniqueElementsStorage = [];
  /*
   * gets item to check, array in which check will perform
   * returns true if item is unique
   */
  var checkUniqueness = function (item,array){
    for (var i=0;i<array.length;i++){
      if (item === array[i]){
        return false;
      }
    }
    array.push(item);
    return true;
  }
  
  
  column.forEach(function(word,i){
    Array.prototype.forEach.call(word,function(letter,n){
      if (checkUniqueness(letter,uniqueElementsStorage)){
        uniqueCount++;
      }
    })
  })
  
  return uniqueCount;
}


/*
 * gets one column, returns data type listed in allowedDataTypes or null, if data type is not among them
 */
exports.getDataType = function(column) {
  var data = column[0];
  var allowedDataTypes = ['date', 'string', 'number'];
  
  var analyzeString = function(string){
    if (parseInt(string)){
      return 'number';
    }
    else if (Date.parse(string)){
      return 'date'
    }
    else{
      return 'string';
    }
  }
  
  var dataType = typeof(data);
  if (dataType === 'string'){
    dataType = analyzeString(data);
  }

  if (allowedDataTypes.some(function(x,i){return x===dataType})){
    return dataType;
  }
  else{
    return null;
  }
}