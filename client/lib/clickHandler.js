var pageGen = require('./pageGenerator');

module.exports = function(toolBoxGen){

  //Add Blocks Button:
  $(window.parent.document).find('#addBlocksButton').on('click', function(e){
    e.preventDefault();
    $(window.parent.document).find("#addBlocksDialog").modal();
  });

  //Run Button:
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

  //Share Button:
  $(window.parent.document).find('#shareButton').on('click', function(e){
    e.preventDefault();
    $(window.parent.document).find('#shareDialog .question').show();
    $(window.parent.document).find("#shareDialog h3").text('Share this Project!');
    $(window.parent.document).find('#shareLoading').hide();
    $(window.parent.document).find("#shareDialog").modal();
    //Blockly XML:


    // $.ajax({
    //   url:
    // });

  });

  $(window.parent.document).find('#shareBlocks').on('click', function(e){
    console.log("Editable clicked.");
    e.preventDefault();

    $(window.parent.document).find('#shareDialog .question').hide();
    $(window.parent.document).find('#shareLoading').show();
    $(window.parent.document).find("#shareDialog h3").text('Loading...');
  });

  $(window.parent.document).find('#shareResult').on('click', function(e){
    e.preventDefault();

    console.log("Result clicked.");

    //Generated code:
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');

    $(window.parent.document).find('#shareDialog .question').hide();
    $(window.parent.document).find('#shareLoading').show();
    $(window.parent.document).find("#shareDialog h3").text('Loading...');
  });

}