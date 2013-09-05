var hyperspace = require('../node_modules/hyperspace');
var fs = require('fs');
var templateHtml = fs.readFileSync(__dirname+ '/../site/template.html');
var entryHtml = fs.readFileSync(__dirname+ '/../site/browse/entry.html')

module.exports = function(req, res){

  //Shared logic goes here
  res.end("Coming soon...")

}

var entryRenderer = hyperspace(entryHtml, function(entryJson){
  return {
    '.entryTitle':"Substituted title!",
    '.entryDescription':"Statically sbustittued description"
  };
})