// window.onload = function() {
//   window.Blockly.injectWorkspace({injectStyles: true})
// }

var toolBoxGen = require('./lib/toolBoxGen')();
toolBoxGen.generateToolbox();
window.blocklyToolbox = toolBoxGen.toolbox;