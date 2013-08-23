var https = require('https');
var fs = require('fs');
var url = require('url');
var ecstatic = require('ecstatic');
var through = require('through');
var trumpet = require('trumpet');
var _ = require('underscore');

//Route handlers:
var blocklyFrameHandler = require('./routes/frameHandler.js');

var port = process.env.PORT || 8082;
console.log("Starting up on port "+port);

var httpsOptions = {
  key: fs.readFileSync(__dirname+'/secrets/server-key.pem'),
  cert: fs.readFileSync(__dirname+'/secrets/server-cert.pem')
}

https.createServer(httpsOptions, function(req, res){
	console.log("Request received.");
  var parsedReq = url.parse(req.url,true);
  var path = parsedReq.pathname.split('/');

  //When blockly iframe is requested, inject requested module scripts:
  if(path[1] === 'frame.html'){
    blocklyFrameHandler(req, res);

  //Otherwise, route to static assets:
  }else{
    ecstatic({root: __dirname+'/site', handleError:false})(req, res);
  }

}).listen(port);