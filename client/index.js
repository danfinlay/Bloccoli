var toolBoxGen = require('./lib/toolBoxGen')();
var urlHandler = require('./lib/urlHandler')();
console.log("URl handler: "+urlHandler);
var clickHandler = require('./lib/clickHandler')(toolBoxGen);
//Generate toolbox:

toolBoxGen.generateToolbox();
window.parent.blocklyXMLToolbox = toolBoxGen.toolbox;
