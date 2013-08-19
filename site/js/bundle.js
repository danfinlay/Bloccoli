;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var toolBoxGen = require('./lib/toolBoxGen')();
var urlHandler = require('./lib/urlHandler')();
console.log("URl handler: "+urlHandler);
var clickHandler = require('./lib/clickHandler')(toolBoxGen);
//Generate toolbox:


toolBoxGen.generateToolbox();
window.parent.blocklyXMLToolbox = toolBoxGen.toolbox;

},{"./lib/clickHandler":2,"./lib/toolBoxGen":4,"./lib/urlHandler":5}],2:[function(require,module,exports){
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
module.exports = function(options){
  return new ToolBoxGenerator(options);
};

var ToolBoxGenerator = function(options){
  window.parent.blocklyToolbox = [];
  generateBasicBlocks.call(this);

  this.toolbox = '';
}

ToolBoxGenerator.prototype.generateToolbox = generateToolbox;

function generateToolbox(){
  var newXml = '<xml id="toolbox">';
  for(var i = 0, iLen = window.parent.blocklyToolbox.length; i < iLen; i++){
    newXml += '<category name="'+window.parent.blocklyToolbox[i].name+'">';
    for(var b = 0, bLen = window.parent.blocklyToolbox[i].blocks.length; b < bLen; b++){
      newXml += '<block type="'+window.parent.blocklyToolbox[i].blocks[b]+'"></block>';
    }
    newXml += '</category>';
  }
  newXml += '</xml>';
  this.toolbox = newXml;
  return newXml;
}

function xmlForCategory(category){

}

function generateBasicBlocks(){
  window.parent.blocklyToolbox = [
    {
      name:"Logic",
      blocks:[
        "controls_if",
        "logic_compare",
        "logic_operation",
        "logic_negate",
        "logic_boolean",
        "logic_null",
        "logic_ternary"
      ]
    },
    {
      name:"Loops",
      blocks:[
        "controls_repeat",
        "controls_repeat_ext",
        "controls_whileUntil",
        "controls_for",
        "controls_forEach",
        "controls_flow_statements"
      ]
    },
    {
      name:"Math",
      blocks:[
        "math_number",
        "math_arithmetic",
        "math_single",
        "math_constant",
        "math_number_property",
        "math_change",
        "math_on_list",
        "math_modulo",
        "math_constrain",
        "math_random_int",
        "math_random_float"
      ]
    },
    {
      name:"Text",
      blocks:[
        "text_join",
        "text_append",
        "text_length",
        "text_isEmpty",
        "text_indexOf",
        "text_charAt",
        "text_getSubstring",
        "text_changeCase",
        "text_trim",
        "text_print",
        "text_prompt"
      ]
    },
    {
      name:"Lists",
      blocks:[
        "lists_create_empty",
        "lists_create_with",
        "lists_repeat",
        "lists_length",
        "lists_isEmpty",
        "lists_indexOf",
        "lists_getIndex",
        "lists_setIndex",
        "lists_getSublist"
      ]
    },
    {
      name:"Color",
      blocks:[
        "colour_picker",
        "colour_random",
        "colour_rgb",
        "colour_blend"
      ]
    },
    {
      name:"Variables",
      blocks:[
        "variables_get",
        "variables_set",
        "lists_create_empty",
        "lists_create_with",
        "lists_repeat",
        "lists_length",
        "lists_isEmpty",
        "lists_indexOf",
        "lists_getIndex",
        "lists_setIndex",
        "lists_getSublist"
      ]
    },
    {
      name:"Functions",
      blocks:[
        "procedures_defreturn",
        "procedures_ifreturn"
      ]
    }
  ];

}
},{}],5:[function(require,module,exports){


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