var http = require('http');
var fs = require('fs');

var alertBlock = fs.readFileSync('./blocks/alert.js');

http.createServer(function(req, res){

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081')
  res.writeHead(200);
  fs.createReadStream('./blocks/alert.js').pipe(res);

}).listen(8082);