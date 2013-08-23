var fs = require('fs');
var url = require('url');

var frame = [
  fs.readFileSync('./site/frame1.html'),
  fs.readFileSync('./site/frame2.html')
];

module.exports = function(req, res){

  var parsedReq = url.parse(req.url,true);
  var queries = parsedReq.query;
  var path = parsedReq.pathname.split('/');
  var filename = path[path.length-1];

   var extensions;
     if(queries && queries.bloccoliExtensions){
      extensions = _.uniq(eval(unescape(queries.bloccoliExtensions)));
     }else{
      extensions = [];
     }
    res.writeHead(200);
    res.write(frame[0]);

    for(var i = 0; i < extensions.length; i++){
      res.write('<script src="./blocks/'+extensions[i]+'.js"></script>');
    }
    res.end(frame[1]);
}