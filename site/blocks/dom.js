var helpUrl = 'http://bloccoli.herokuapp.com/blocks/dom.html'; //Add proper help URL later.

window.parent.blocklyToolbox.push({
  name:'DOM',
  blocks:[
    'dom_select_then',
    'dom_select_elements',
    'dom_select_class',
    'dom_select_id',
    'dom_replace_text',
    'dom_replace_html',
    'dom_append',
    'dom_prepend'
    ],
  scripts:['http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js']
});

// console.log("Initing DOM..  Blockly is "+Blockly+" and JS is "+Blockly.JavaScript);

//dom_select_then:
Blockly.Language.dom_select_then = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(150);
    this.appendValueInput("select")
        .setCheck("selector")
        .appendTitle("Select");
    this.appendValueInput("then")
        .setCheck("dom_action")
        .appendTitle("then");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_select_then = function() {
  var value_select = Blockly.JavaScript.valueToCode(this, 'select', Blockly.JavaScript.ORDER_NONE);
  var value_then = Blockly.JavaScript.valueToCode(this, 'then', Blockly.JavaScript.ORDER_NONE);
  var code = ''
  if(value_select && value_then){
    code = '$('+value_select+')'+value_then+';\n';
  }
  return code;
};


Blockly.JavaScript.dom_select_id = function() {
  var text_id = this.getTitleValue('id');
  // TODO: Assemble JavaScript into code variable.
  var code = '"#'+text_id+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//SELECTORS:

//Select by Element Type:
Blockly.Language.dom_select_elements = {
  helpUrl: helpUrl,
  init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendTitle("Element Type")
        .appendTitle(new Blockly.FieldTextInput("body"), "el_type");
    this.setInputsInline(true);
    this.setOutput(true, 'selector');
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_select_elements = function() {
  var text_el_type = this.getTitleValue('el_type');
  var code = '"'+ text_el_type+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Select by Class:
Blockly.Language.dom_select_class = {
  helpUrl: helpUrl,
  init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendTitle("Class")
        .appendTitle(new Blockly.FieldTextInput("myClass"), "el_type");
    this.setInputsInline(true);
    this.setOutput(true, 'selector');
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_select_class = function() {
  var text_class = this.getTitleValue('class');
  // TODO: Assemble JavaScript into code variable.
  var code = '".'+text_class+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Select by ID:
Blockly.Language.dom_select_id = {
  helpUrl: helpUrl,
  init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendTitle("ID")        
        .appendTitle(new Blockly.FieldTextInput("myID"), "id");
    this.setInputsInline(true);
    this.setOutput(true, 'selector');
    this.setTooltip('');
  }
}

//ACTIONS:

//Replace Text:
Blockly.Language.dom_replace_text = {
  helpUrl: helpUrl,
  init: function() {
    this.setColour(330);
    this.appendValueInput("newText")
        .setCheck("String")
        .appendTitle("Fill with text");
    this.setOutput(true, 'dom_action');
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_replace_text = function() {
  var value_newtext = Blockly.JavaScript.valueToCode(this, 'newText', Blockly.JavaScript.ORDER_NONE);
  var code = '.text('+value_newtext+')';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Replace HTML:
Blockly.Language.dom_replace_html = {
  helpUrl: helpUrl,
  init: function() {
    this.setColour(330);
    this.appendValueInput("newHtml")
        .setCheck("String")
        .appendTitle("Fill with HTML");
    this.setOutput(true, 'dom_action');
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_replace_html = function() {
  var value_newhtml = Blockly.JavaScript.valueToCode(this, 'newHtml', Blockly.JavaScript.ORDER_NONE);
  var code = '.html('+value_newtext+')';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Replace HTML:
Blockly.Language.dom_append = {
  helpUrl: helpUrl,
  init: function() {
    this.setColour(330);
    this.appendValueInput("newHtml")
        .setCheck("String")
        .appendTitle("Append");
    this.setOutput(true, 'dom_action');
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_append = function() {
  var value_newhtml = Blockly.JavaScript.valueToCode(this, 'newHtml', Blockly.JavaScript.ORDER_NONE);
  var code = '.append('+value_newhtml+')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Replace HTML:
Blockly.Language.dom_prepend = {
  helpUrl: helpUrl,
  init: function() {
    this.setColour(330);
    this.appendValueInput("newHtml")
        .setCheck("String")
        .appendTitle("Prepend with");
    this.setOutput(true, 'dom_action');
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_prepend = function() {
  var value_newhtml = Blockly.JavaScript.valueToCode(this, 'newHtml', Blockly.JavaScript.ORDER_NONE);
  var code = '.prepend('+value_newhtml+')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};