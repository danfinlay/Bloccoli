var url = require('url');

module.exports = function(req, res){


  var parsedReq = url.parse(req.url,true);
  var path = parsedReq.pathname.split('/');
  	console.log("New program post attempted: "+JSON.stringify(parsedReq));

}