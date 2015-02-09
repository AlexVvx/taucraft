exports.emptyPage = function(req, res) {
  res.render('404',{pageName:'Page not found'});
}