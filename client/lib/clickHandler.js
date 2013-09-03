var pageGen = require('./pageGenerator');
var request = require('browser-request');
var modal = require('./modal');
window.currentUser = null;

module.exports = function(){

  BlocklyStorage.backupOnUnload();

  //Add Blocks Button:
  $(window.parent.document).find('#addBlocksButton').on('click', function(e){
    e.preventDefault();
    $(window.parent.document).find("#addBlocksDialog").modal();
  });

  //Run Button:
  $(window.parent.document).find('#runButton').on('click', function(e){

    e.preventDefault();
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');
    var generatedPage = pageGen(code);
    window.parent.subFrameFromHtml(generatedPage);
    // BlocklyStorage.link()

  });

  //Share Button:
  $(window.parent.document).find('#shareButton').on('click', function(e){
    e.preventDefault();
    modal.shareDialog();
  });

  $(window.parent.document).find('#shareProjectButton').on('click', function(e){
    console.log("Editable clicked.");
    e.preventDefault();

    $(window.parent.document).find('#shareDialog .question').hide();
    $(window.parent.document).find('#shareLoading').show();
    $(window.parent.document).find("#shareDialog h3").text('Loading...');

     //Blockly XML:
    var blocklyXml = window.Blockly.Xml.domToText(window.Blockly.Xml.workspaceToDom(window.Blockly.mainWorkspace));
    var title = $(window.parent.document).find('#projectTitleField').val();
    var description = $(window.parent.document).find('#projectDescriptionField').val();

    var postData = {
      'code':blocklyXml,
      'title': title,
      'description': description,
      'createdAt': Date.now(),
      'author': window.currentUser || 'anon',
      'scripts': window.bloccoliExtensions
    }

    console.log("Attempting to post project..");

    request.post({method:'POST', url:'/newProgram', body:postData, json:true},
      function(er, res, body){
        if(er) return modal.stopLoading("Project post had an error: "+ er);
        modal.doneLoadingNewProject(JSON.parse(res.responseText).uniqueId);

    });

  });

  $(window.parent.document).find('#shareResult').on('click', function(e){
    e.preventDefault();

    console.log("Result clicked.");

    //Generated code:
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');

    $(window.parent.document).find('#shareDialog .question').hide();
    $(window.parent.document).find('#shareLoading').show();
    $(window.parent.document).find("#shareDialog h3").text('Loading...');

         //Blockly XML:
    var code = window.Blockly.Generator.workspaceToCode('JavaScript');

    var postData = {
      'code':code,
      'createdAt': Date.now(),
      'author': window.currentUser || 'anon',
      'scripts': window.bloccoliExtensions
    }

    console.log("Attempting to post compiled project..");

    request.post({url:'/newResult', body:JSON.stringify(postData), json:true},
      function(er, res, body){
        if(er) return modal.stopLoading("Project post had an error: "+ er);
        modal.doneLoadingNewProject(JSON.parse(res.responseText).uniqueId);

    });
  });

};