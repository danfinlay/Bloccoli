var url = require('url');
var qs = require('querystring');
var programs = require('../db/programs');
var programDB = programs();

var recentPosters = {};

module.exports = function(req, res){


  var postReceivedTime = Date.now();

  var posterIP = req.connection.remoteAddress;

  if(notFlooding(posterIP)){

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

      programDB.newAnonymousProgram(parsedReq).then(function(programId){

        console.log("New program added: "+programId+" in just "+(Date.now()-postReceivedTime) +' miliseconds.');
        res.writeHead(200);
        res.end(JSON.stringify({uniqueId: programId}));

      }, function(reason){

        console.log("Saving created error: "+reason);
        res.writeHead(500);
        res.end(reason);

      });

    });

  } else {

  }

}

function notFlooding(ip){
  var now = Date.now();

  if(!recentPosters[ip]){
    recentPosters[ip] = now;
    return true;
  }else{
    if(recentPosters[ip] > now - 120000){
      recentPosters[ip] = now;
      return false;
    }else{
      recentPosters[ip] = now;
      return true;
    }
  }

  //Clean up recentPosters object
  for(prop in recentPosters){
    if(recentPosters[prop] < now - 120000){
      delete recentPosters[prop];
    }
  }
}