var http = require('http');
var fs = require('fs');
var url = require('url');
var ecstatic = require('ecstatic');
var through = require('through');
var trumpet = require('trumpet');

http.createServer(function(req, res){

  var parsedReq = url.parse(req.url,true);
  var queries = parsedReq.query;
  var path = parsedReq.pathname.split('/');
  var filename = path[path.length-1];

  // console.log("request url: "+req.url);
  // console.log("Query: "+path);
  // console.log("Path: "+ JSON.stringify(path) +" queries: "+JSON.stringify(queries));
  // if(filename === 'frame.html') console.log("Frame arguments: "+JSON.stringify(queries));
  // console.log(queries);

  if(path[1] === 'frame.html' && queries && queries.bloccoliExtensions){
    console.log("Frame with arguments recognized.");
    var extensions = eval(unescape(queries.bloccoliExtensions));

    var extensionTrumpet = trumpet();
    extensionTrumpet.selectAll('#frameInitScript', function(elem){
      var writeOutStream = elem.createWriteStream();
      for(var i = 0; i < extensions.length; i++){
        console.log("Piping out module.");
        fs.createReadStream(__dirname + '/../site/blocks/'+extensions[i]+'.js').pipe(writeOutStream);
      }
    });

    fs.createReadStream(__dirname+'/../site/frame.html')
    .pipe(extensionTrumpet).pipe(res);

  }else{
    // console.log("Ecstatic taking over");
    ecstatic({root: __dirname+'/../site/', handleError:false})(req, res);
  }


  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081')
  // res.writeHead(200);
  // fs.createReadStream('./blocks/alert.js').pipe(res);


}).listen(8082);