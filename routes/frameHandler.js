var fs = require('fs');
var url = require('url');
var _ = require('underscore');

var programs = require('../db/programs')();

var frame = [
  fs.readFileSync('./site/frame1.html'),
  fs.readFileSync('./site/frame2.html')
];


module.exports = function(req, res){

  //Is automatically OK because worst case scenerio there are no modules loaded, will inject such an alert if that's the case.
  res.writeHead(200);
  res.write(frame[0]);

  var parsedReq = url.parse(req.url,true);
  var queries = parsedReq.query;
  var path = parsedReq.pathname.split('/');


  //Inject saved program if referred to in referrer's address:
  var referrer = req.headers['referer'];

  //Get query from extensions
  var extensionHeaders;
  var refParsedReq = url.parse(referrer,true);
  extensionHeaders = queries.bloccoliExtensions ? JSON.parse(queries.bloccoliExtensions) : [];
  console.log("Extension headers gave: "+JSON.stringify(extensionHeaders));

  console.log("Frame handler received: "+JSON.stringify(extensionHeaders));

  //If this frame is behind /programs/ and received no headers, there is some extra saved data to inject into it, and it "shouldLoad" those.
  var slicedRef = referrer.split('/');
  var shouldLoad = slicedRef[slicedRef.length-2] === 'programs' && extensionHeaders.length === 0 ? true : false;
  if(shouldLoad){

    var programCode = slicedRef[slicedRef.length-1];;
    console.log("Program code parsed: "+programCode);

    programs.get(programCode).then(function(program){
      // console.log("Program got: "+JSON.stringify(program));
      // console.log("With scripts: "+JSON.stringify(program.scripts));

      if(program.scripts && program.scripts.length > 0){
        for(var i = 0; i < program.scripts.length; i++){
          res.write('<script src="./blocks/'+program.scripts[i]+'.js"></script>');
        }
      }
      res.write(generateProgramInjectionFrom(program));
      res.end(frame[1]);
    }, function(reason){
      res.write('<script>alert("There was a problem retrieving the program: '+reason+'");</script>');
      res.end(frame[1]);
    });

  //Otherwise, just load the page with queried extensions as usual:
  }else{

    //This is not a default program's scripts, let's load from the headers:
    console.log("Not default, loading scritps: "+JSON.stringify(extensionHeaders));
    for(var i = 0; i < extensionHeaders.length; i++){
      res.write('<script src="./blocks/'+extensionHeaders[i]+'.js"></script>');
    }
    res.end(frame[1]);
  
  }
}

function generateProgramInjectionFrom(program){

  // console.log("Preparing program: "+program);
  // console.log("Program stringified: "+JSON.stringify(program));

  var xmlArray = program.xml.split('\n');
  var scripts = program.scripts && program.scripts > 0 ? program.scripts : [];

  //Browser instructions:
  var instructions = '<script>';
  instructions += 'var uglyXml = "";';
  for(var i = 0; i < xmlArray.length; i++){
    instructions+= 'uglyXml+=unescape("'+escape(xmlArray[i])+'");';
  }
  instructions += 'newProgram = false;</script>';
  for(var i = 0; i < scripts.length; i++){
    instructions+='<script src="./blocks/'+scripts[i]+'.js"></script>';
  }
  // console.log("Instructions generated: "+instructions);
  return instructions;

}