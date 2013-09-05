// var https = require('https');
var http = require('http');
var fs = require('fs');
var url = require('url');
var ecstatic = require('ecstatic');
var through = require('through');
var trumpet = require('trumpet');
var _ = require('underscore');
var domain = require('domain');


//Route handlers:
var blocklyFrameHandler = require('./routes/frameHandler.js');
var projectPostHandler = require('./routes/projectPostHandler.js');
var programHandler = require('./routes/programHandler.js');
var browseHandler = require('./routes/browseHandler.js');

var port = process.env.PORT || require('./lib/defaultPort')();
console.log("Starting up on port "+port);

//For a point when we might switch to encrypted connections.
// var httpsOptions = {
//   key: fs.readFileSync(__dirname+'/secrets/server-key.pem'),
//   cert: fs.readFileSync(__dirname+'/secrets/server-cert.pem')
// }

http.createServer(function(req, res){

  //Handle errors with domains:
  var d = domain.create();
  d.on('error', function(er){
    console.log("Connection threw error: "+er+' from stack: '+er.stack);

    try{
      var killtimer = setTimeout(function() {
        process.exit(1);
      }, 30000);
      // But don't keep the process open just for that!
      killtimer.unref();
      // stop taking new requests.
      server.close();
      res.statusCode = 500;
      res.setHeader('content-type', 'text/plain');
      res.end('Oops, there was a problem!\n');

    }catch (er2){
      console.log("Couldn't shut down gracefully."+ er2.stack);
    }
  });

  //Run server within domain:
  d.run(function(){

    var parsedReq = url.parse(req.url,true);
    var path = parsedReq.pathname.split('/');

    //When blockly iframe is requested, inject requested module scripts:
    if(path[1] === 'frame.html'){
      blocklyFrameHandler(req, res);

    //Otherwise, route to static assets:
    }else if(path[1] === 'newProgram' && req.method === 'POST'){
      projectPostHandler(req, res);

    }else if(path[1] === 'programs' && path[3] === 'frame.html'){
      programHandler(req, res);

    }else if(path[1] === 'programs' && !path[3]){
      res.writeHead(200);
      fs.createReadStream(__dirname+'/site/new/index.html').pipe(res);

    }else if(path[1] === 'programs' && path[3] !== 'frame.html'){
      ecstatic({root: __dirname+'/site/new', baseDir:'programs', handleError:false})(req, res);

    }else if(path[1] === 'browse'){
      browseHandler(req, res);

    }else{
      ecstatic({root: __dirname+'/site', handleError:false})(req, res);

    }

  });

}).listen(port);

//Redirect http requests to HTTPS:
// http.createServer(function(req, res){
// 	res.writeHead(200);
// 	res.end('<html><a href="https://localhost:'+port+'">Continue to site</a></html>');
// }).listen(port);

