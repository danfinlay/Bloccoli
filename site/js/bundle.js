;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var toolBoxGen = require('./lib/toolBoxGen')();
var clickHandler = require('./lib/clickHandler')(toolBoxGen);

//Generate toolbox:

toolBoxGen.generateToolbox();
window.blocklyToolbox = toolBoxGen.toolbox;
},{"./lib/clickHandler":2,"./lib/toolBoxGen":4}],2:[function(require,module,exports){
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
},{"./integrator":3}],3:[function(require,module,exports){
module.exports = function(toolBoxGen){
  return new Integrator(toolBoxGen);
}

var Integrator = function(toolBoxGen){
  this.toolBoxGen = toolBoxGen;
}

Integrator.prototype.integrate = function(data){
  console.log("About to eval object");
  var newObject = eval(data);
  console.log("Object evaluated: "+JSON.stringify(newObject));
  var blockList = [];

  //Retrieve language:
  if(typeof newObject.Language === 'object'){
    for(block in newObject.Language){
      console.log("Now trying to set language "+block+" of "+window.Blockly.Language+' to '+newObject.Language[block]);
      window.Blockly.Language[block] = newObject.Language[block];
      blockList.push(block);
    }
  }

  //Retrieve generators:
  if(typeof newObject.Javascript === 'object'){
    for(block in newObject.Javascript){
      window.Blockly.Javascript[block] = newObject.Javascript[block];
    }
  }

  this.toolBoxGen.categories.push({
    name:newObject.name,
    blocks:blockList
  })

  window.blocklyToolbox = this.toolBoxGen.generateToolbox();

  Blockly.inject(document.body,
  {
    path: './blockly/',
    readOnly: false,
    trashcan: true,
    toolbox: window.blocklyToolbox
  });
}
},{}],4:[function(require,module,exports){
module.exports = function(options){
  return new ToolBoxGenerator(options);
};

var ToolBoxGenerator = function(options){
  this.categories = [];
  generateBasicBlocks.call(this);

  this.toolbox = '';
}

ToolBoxGenerator.prototype.generateToolbox = generateToolbox;

function generateToolbox(){
  var newXml = '<xml id="toolbox">';
  for(var i = 0, iLen = this.categories.length; i < iLen; i++){
    newXml += '<category name="'+this.categories[i].name+'">';
    for(var b = 0, bLen = this.categories[i].blocks.length; b < bLen; b++){
      newXml += '<block type="'+this.categories[i].blocks[b]+'"></block>';
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
  this.categories = [
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
},{}]},{},[1])
;