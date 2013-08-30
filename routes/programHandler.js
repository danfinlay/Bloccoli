var url = require('url');
var programs = require('../db/programs');
var programs = programs();
var fs = require('fs');
var frame = [
  fs.readFileSync('./site/frame1.html'),
  fs.readFileSync('./site/frame2.html')
];

module.exports = function(req, res){
  console.log("Loading saved file...");

  var parsedReq = url.parse(req.url,true);
  var path = parsedReq.pathname.split('/');

  var programId = url.parse(req.url,true).pathname.split('/')[2];

  programs.get(programId).then(function(program){

    res.writeHead(200);

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

    res.write(generateProgramInjectionFrom(program));
    res.end(frame[1]);


  }, function(reason){

    res.writeHead(500);
    res.end("Retrieving saved program threw an error: "+reason);

  });

}


function generateProgramInjectionFrom(program){
  var program = {
    xml: postedObject.code,
    createdAt: Date.now(),
    author: 'anon',
    scripts: postedObject.scripts
  }

  //Browser instructions:
  var instructions = '';
  instructions += 'var uglyXml = "'+program.xml+'"; newProgram = false;';
  console.log("Instructions generated: "+instructions);
  return instructions;

}