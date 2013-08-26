// var https = require('https');
var http = require('http');
var fs = require('fs');
var url = require('url');
var ecstatic = require('ecstatic');
var through = require('through');
var trumpet = require('trumpet');
var _ = require('underscore');

//Route handlers:
var blocklyFrameHandler = require('./routes/frameHandler.js');
var projectPostHandler = require('./routes/projectPostHandler.js');

var port = process.env.PORT || 8082;
console.log("Starting up on port "+port);

//For a point when we might switch to encrypted connections.
// var httpsOptions = {
//   key: fs.readFileSync(__dirname+'/secrets/server-key.pem'),
//   cert: fs.readFileSync(__dirname+'/secrets/server-cert.pem')
// }

http.createServer(function(req, res){
	console.log("Request received.");

  var parsedReq = url.parse(req.url,true);
  var path = parsedReq.pathname.split('/');

  //When blockly iframe is requested, inject requested module scripts:
  if(path[1] === 'frame.html'){
    blocklyFrameHandler(req, res);

  //Otherwise, route to static assets:
  }else if(path[1] === 'newProgram' && req.method === 'POST'){
  	projectPostHandler(req, res);

  }else{
    ecstatic({root: __dirname+'/site', handleError:false})(req, res);
  }

}).listen(port);

//Redirect http requests to HTTPS:
// http.createServer(function(req, res){
// 	res.writeHead(200);
// 	res.end('<html><a href="https://localhost:'+port+'">Continue to site</a></html>');
// }).listen(port);

