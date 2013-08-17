module.exports = function(toolBoxGen){

  var integratorModule = require('./integrator');
  var integrator = integratorModule(toolBoxGen);

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
  
  $(window.parent.document).find('#addBlojule').on('click', function(e){
    e.preventDefault();
    var url = $(window.parent.document).find("#blojuleAddressField").val();
    console.log("Making request...");
    $.ajax({
      url:url,
    }).done(function(data){
      
      integrator.integrate(data);

    }).fail(function(er){
      alert("Error: "+JSON.stringify(er));
    }).always(function(){
      $(window.parent.document).find("#addBlocksDialog").modal('hide');
    })
  });

  $(window.parent.document).find('#runButton').on('click', function(e){
    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
    console.log("Code generated: "+code);
  });

  $(window.parent.document).find('#shareButton').on('click', function(e){
    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
  });

  

}