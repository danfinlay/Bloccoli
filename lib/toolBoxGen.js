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