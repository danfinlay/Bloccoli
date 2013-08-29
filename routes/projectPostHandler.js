var url = require('url');
var qs = require('querystring');
var programs = require('../db/programs');

module.exports = function(req, res){

  var body = '';

  req.on('data', function(chunk){
    body+=chunk;
  });

  req.on('end', function(){
    var parsedReq = url.parse(req.url,true);
    var path = parsedReq.pathname.split('/');
    var postBody = qs.parse(body);
    var parsed = JSON.parse(body);
    console.log("New program post attempted: "+JSON.stringify(parsedReq));

    console.log("Body result: "+JSON.stringify(parsed, null, '\t'));
    console.log("Code result: "+parsed.code);

  })


}