
module.exports = function(){

  //Vanilla JS Way (not firing):
  // var runButton = window.parent.document.querySelector('#runButton');
  // runButton.addEventListener('onclick', function(e){
  //   e.preventDefault();
  //   var code = window.Blockly.Generator.workspaceToCode('JavaScript');
  //   console.log("Run2 clicked");
  // })


  //jQuery way:
  $(window.parent.document).find('#addBlocksButton').on('click', function(e){
    e.preventDefault();
    console.log("Attempting modal");
    $(window.parent.document).find("#addBlocksDialog").modal();
    addBlocksDialogOpen = true;
  });

  $(window.parent.document).find('#runButton').on('click', function(e){
    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
  });

  $(window.parent.document).find('#shareButton').on('click', function(e){
    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
  });

  

}