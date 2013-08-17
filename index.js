var toolBoxGen = require('./lib/toolBoxGen')();
var clickHandler = require('./lib/clickHandler')();


//Generate toolbox:

toolBoxGen.generateToolbox();
window.blocklyToolbox = toolBoxGen.toolbox;

