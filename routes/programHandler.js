var url = require('url');
var programs = require('../db/programs');
var programs = programs();

module.exports = function(req, res){

  var parsedReq = url.parse(req.url,true);
  var path = parsedReq.pathname.split('/');

  var programId = url.parse(req.url,true).pathname.split('/')[2];

  programs.get.then(function(program){

    

  }, function(reason){

    

  });

}
