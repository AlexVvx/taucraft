/* 
 * 
 * 
 * @param {type} testObj
 * @returns {Boolean}
 */

exports.isArray = function(testObj){
  if( Object.prototype.toString.call( testObj ) === '[object Array]' ) {
    return true;
  }
  return false;
}


/*
 * @param {array} column
 * @returns {Number} from 0 to 100
 */
exports.nonespacesStatistics = function(column) {
  if (!this.isArray(column)){
    throw new Error('Expected an array');
  }
  if (column.length===0){
    return 0;
  }
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
 * @param {array} column
 * @returns {Number}
 */
exports.uniqueCharactersStatistics = function(column) {
  if (!this.isArray(column)){
    throw new Error('Expected an array');
  }
  if (column.length===0){
    return 0;
  }
  var uniqueCount = 0,
      uniqueElementsStorage = [];

  /*
   * gets item to check and array in which check will perform
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
 * @param {array} column
 * @returns {String} data type if it equals 'date', 'string' or 'number'
 */
exports.getDataType = function(column) {
  if (!this.isArray(column)){
    throw new Error('Expected an array');
  }
  var data = column[0];
  var allowedDataTypes = ['date', 'string', 'number'];
  
  var analyzeString = function(string){
    if (parseInt(string)){
      return 'number';
    }
    else if (Date.parse(string)){
      return 'date';
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