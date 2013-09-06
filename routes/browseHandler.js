var hyperspace = require('../node_modules/hyperspace');
var fs = require('fs');
var programDB = require('../db/programs')();
// var templateHtml = fs.readFileSync(__dirname+ '/../site/template.html');
// var entryHtml = fs.readFileSync(__dirname+ '/../site/browse/entry.html');
var _ = require('../node_modules/lodash');

module.exports = function(req, res){

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write
  res.end(JSON.stringify(programDB.programMenu()));

}

// var entryRenderer = function(entry){
//   var result = '<div class="programEntry">';
//   result+='<a href="/programs/'+entry.key'">';
//   result+=entry.value.title

//   return result;
// }