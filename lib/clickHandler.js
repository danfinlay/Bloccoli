module.exports = function(toolBoxGen){

  var integratorModule = require('./integrator2');
  var integrator = integratorModule(toolBoxGen);
  // this.urlHandler = urlHandler

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
  });

  $(window.parent.document).find('#runButton').on('click', function(e){
    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
    console.log("Code generated: "+code);
    eval(code);
  });

  $(window.parent.document).find('#shareButton').on('click', function(e){
    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
  });

 
  function getUrlVars()
  {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
  }  

}