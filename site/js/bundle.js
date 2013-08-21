;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// var toolBoxGen = require('./lib/toolBoxGen')();
var urlHandler = require('./lib/urlHandler')();
console.log("URl handler: "+urlHandler);
var clickHandler = require('./lib/clickHandler')();
//Generate toolbox:

// toolBoxGen.generateToolbox();
// window.parent.blocklyXMLToolbox = toolBoxGen.toolbox;

},{"./lib/clickHandler":2,"./lib/urlHandler":4}],2:[function(require,module,exports){
var pageGen = require('./pageGenerator');

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
    BlocklyStorage.link()

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
},{"./pageGenerator":3}],3:[function(require,module,exports){
module.exports = function(generatedJS){

  window.parent.blocklyToolbox;

  var result = '<!doctype html><html><head><title>Blockly Project</title>';

  //Add in dependencies.
  for(var i = 0, len = window.parent.blocklyToolbox.length; i < len; i++){
    if(window.parent.blocklyToolbox[i].scripts){
      for(var s = 0, sLen = window.parent.blocklyToolbox[i].scripts.length; s < sLen; s++){

        result += '<script src="' + window.parent.blocklyToolbox[i].scripts[s] + '"></script>';

      }
    }
  }

  result += '</head><body></body>';

  //Add in generated script.
  result += '<script>' + generatedJS + '</script>';

  result += '</html>';

  return result;

}
},{}],4:[function(require,module,exports){


function UrlHandler(){
  this.getUrlVars = getUrlVars;
  this.updateExtensions = updateExtensions;
  this.reloadPageWithExtensions = reloadPageWithExtensions;
  this.reloadPageWithExtension = reloadPageWithExtension;

  var handler = this;
  $(window.parent.document).find('#addBlojule').on('click', function(e){

    e.preventDefault();
    var blojuleAddress = $(window.parent.document).find("#blojuleAddressField").val();
    handler.reloadPageWithExtension(blojuleAddress);

  });
}

// UrlHandler.prototype.getUrlVars = getUrlVars;

function getUrlVars()
{
    var vars = [], hash;
    var source = document.referrer;
    var hashes = source.slice(source.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// UrlHandler.prototype.updateExtensions = updateExtensions;
function updateExtensions(){
  var urlVals = getUrlVars();
  console.log("URL vals: "+JSON.stringify(urlVals));
  if(urlVals.bloccoliExtensions){
    window.bloccoliExtensions = eval(unescape(urlVals.bloccoliExtensions));
    console.log("Saved extensions: "+JSON.stringify(window.bloccoliExtensions));
  }
}

function reloadPageWithExtensions(){
  var newUrl = './';
  if(window.bloccoliExtensions){
    newUrl+='?bloccoliExtensions='+escape(JSON.stringify(window.bloccoliExtensions));
  }
  window.parent.location.href = newUrl;
}

function reloadPageWithExtension(newExtensionUrl){
  var newUrl = './';
  if(window.bloccoliExtensions){
    window.bloccoliExtensions.push(newExtensionUrl)
  }else{
    window.bloccoliExtensions = [newExtensionUrl];
  }
  reloadPageWithExtensions();
}

module.exports = function(){
  console.log("Initializing url handler.");
  var result = new UrlHandler();
  result.updateExtensions();
  // console.log("Extension urls embedded: "+JSON.stringify(window.bloccoliExtensions));
  return result;
}
},{}]},{},[1])
;