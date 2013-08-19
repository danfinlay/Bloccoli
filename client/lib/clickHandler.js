var pageGen = require('./pageGenerator');

module.exports = function(toolBoxGen){

  //Add blocks modal launcher:
  $(window.parent.document).find('#addBlocksButton').on('click', function(e){
    e.preventDefault();
    console.log("Attempting modal");
    $(window.parent.document).find("#addBlocksDialog").modal();
  });

  //Run code:
  var running = false;
  $(window.parent.document).find('#runButton').on('click', function(e){

    if(running){
      running = false;
      $(window.parent.document).find('#runButton .run').show();
      $(window.parent.document).find('#runButton .stop').hide();
    }else{
      running = true;
      $(window.parent.document).find('#runButton .run').hide();
      $(window.parent.document).find('#runButton .stop').show();
    }
    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
    var generatedPage = pageGen(code);

    window.parent.subFrameFromHtml(generatedPage);

  });

  $(window.parent.document).find('#shareButton').on('click', function(e){
    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
  });

}