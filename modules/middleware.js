exports.trackTime = function(req,res,next){
  req.start = Date.now(); 
  next();
}