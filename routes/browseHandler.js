var fs = require('fs');
var programDB = require('../db/programs')();
var templateHtml = fs.readFileSync(__dirname+ '/../site/template.html');
var entryHtml = fs.readFileSync(__dirname+ '/../site/browse/entry.html')

module.exports = function(req, res){

  //Shared logic goes here
  res.end("Coming soon...")

}