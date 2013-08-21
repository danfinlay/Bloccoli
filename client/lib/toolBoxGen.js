

module.exports = function(options){
  return new ToolBoxGenerator(options);
};

var ToolBoxGenerator = function(options){
  window.parent.blocklyToolbox = [];
  generateBasicBlocks.call(this);

  this.toolbox = '';
}