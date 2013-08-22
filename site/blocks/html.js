var helpUrl = 'http://bloccoli.herokuapp.com/blocks/html.html'; //Add proper help URL later.

window.parent.blocklyToolbox.push({
  name:'HTML',
  blocks:[
    'html_html',
    'html_text',
    'html_h1'
    // 'html_h2',
    // 'html_h3',
    // 'html_a',
    // 'html_p',
    // 'html_div',
    // 'html_span',
    // 'html_custom'
    ]
});

Blockly.Language.html_html = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(50);
    this.appendStatementInput("html")
        .setCheck("String")
        .appendTitle("HTML");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setTooltip('');
  }
};

Blockly.JavaScript.html_html = function() {
  var statements_html = Blockly.JavaScript.statementToCode(this, 'html');
  // TODO: Assemble JavaScript into code variable.
  var code = '"'+statements_html+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Language.html_text = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(50);
    this.appendValueInput("NAME")
        .appendTitle("text");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.html_text = function() {
  var value_name = Blockly.JavaScript.valueToCode(this, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  return '"+'+value_name+'+"';
};

Blockly.Language.html_h1 = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(50);
    this.appendValueInput("attributeList")
        .setCheck("Array")
        .appendTitle("attribute list");
    this.appendStatementInput("html")
        .appendTitle("h1");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.JavaScript.html_h1 = function() {
  var value_attributelist = Blockly.JavaScript.valueToCode(this, 'attributeList', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_html = Blockly.JavaScript.statementToCode(this, 'html');
  // TODO: Assemble JavaScript into code variable.
  var code = '<h1';
  for(var i = 0; i < value_attributelist.length; i++){
    code += ' '+value_attributelist;
  }
  code+= '>' + statements_html + '</h1>';
  return code;
};