
module.exports = function(){

  //Vanilla JS Way (not firing):
  // var runButton = window.parent.document.querySelector('#runButton');
  // runButton.addEventListener('onclick', function(e){
  //   e.preventDefault();
  //   var code = window.Blockly.Generator.workspaceToCode('JavaScript');
  //   console.log("Run2 clicked");
  // })

  //jQuery way:
  $(window.parent.document).find('#runButton').on('click', function(e){
    e.preventDefault();
    console.log("Run clicked");
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
    console.log("Code generated: "+code);
  });

}