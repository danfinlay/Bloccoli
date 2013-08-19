var http = require('http');
var fs = require('fs');
var url = require('url');
var ecstatic = require('ecstatic');
var through = require('through');
var trumpet = require('trumpet');
var _ = require('underscore');
var frame = [
    fs.readFileSync('./site/frame1.html'),
    fs.readFileSync('./site/frame2.html')
  ]

var port = process.env.PORT || 8082;
console.log("Starting up on port "+port);

http.createServer(function(req, res){

  var parsedReq = url.parse(req.url,true);
  var queries = parsedReq.query;
  var path = parsedReq.pathname.split('/');
  var filename = path[path.length-1];

  console.log("request url: "+req.url);
  console.log("Query: "+path);

  //When blockly iframe is requested, inject requested module scripts:
  if(path[1] === 'frame.html' && queries && queries.bloccoliExtensions){

    console.log("Frame with arguments recognized.");
    var extensions = _.uniq(eval(unescape(queries.bloccoliExtensions)));
    res.writeHead(200);
    res.write(frame[0]);

    for(var i = 0; i < extensions.length; i++){
      res.write('<script src="./blocks/'+extensions[i]+'.js"></script>');
    }
    res.end(frame[1]);

  //Otherwise, route to static assets:
  }else{
    ecstatic({root: __dirname+'/site', handleError:false})(req, res);
  }

}).listen(port);