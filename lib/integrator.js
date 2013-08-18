module.exports = function(toolBoxGen){
  return new Integrator(toolBoxGen);
}

var Integrator = function(toolBoxGen){
  this.toolBoxGen = toolBoxGen;
}

Integrator.prototype.integrate = function(data){
  console.log("About to eval: "+data);

  // var LanguageEnhancer = eval(data);
  // console.log("It's a "+typeof LanguageEnhancer);
  var newObject = eval(data);
  console.log("Object evaluated: "+JSON.stringify(newObject));
  var blockList = [];

  //Retrieve language:
  if(typeof newObject.Language === 'object'){
    for(block in newObject.Language){
      console.log("Now trying to set language "+block+" of "+window.Blockly.Language+' to '+newObject.Language[block]);
      window.Blockly.Language[block] = newObject.Language[block];
      blockList.push(block);
    }
  }

  //Retrieve generators:
  if(typeof newObject.Javascript === 'object'){
    for(block in newObject.Javascript){
      window.Blockly.Javascript[block] = newObject.Javascript[block];
    }
  }

  this.toolBoxGen.categories.push({
    name:newObject.name,
    blocks:blockList
  })

  window.blocklyToolbox = this.toolBoxGen.generateToolbox();

  Blockly.inject(document.body,
  {
    path: './blockly/',
    readOnly: false,
    trashcan: true,
    toolbox: window.blocklyToolbox
  });
}