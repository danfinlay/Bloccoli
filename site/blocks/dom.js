var helpUrl = 'http://bloccoli.herokuapp.com'; //Add proper help URL later.

window.parent.blocklyToolbox.push({
  name:'DOM Selectors',
  blocks:[
    'dom_select_then',
    'dom_select_elements',
    'dom_select_class',
    'dom_select_id',
    'dom_replace_text'
    ],
  scripts:['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js']
});

console.log("Initing DOM..  Blockly is "+Blockly+" and JS is "+Blockly.JavaScript);

//dom_select_then:
Blockly.Language.dom_select_then = {
  helpUrl: helpUrl,
  init: function() {
    this.setColour(180);
    this.appendValueInput("selector")
        .setCheck("selector")
        .appendTitle("DOM Select");
    this.appendValueInput("action")
        .setCheck("dom_action")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Then");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Insert element selector into "Select" and insert action block into "then".');
  }
}
Blockly.JavaScript.dom_select_then = function() {
  var value_selector = Blockly.JavaScript.valueToCode(this, 'selector', Blockly.JavaScript.ORDER_ATOMIC);
  var value_action = Blockly.JavaScript.valueToCode(this, 'action', Blockly.JavaScript.ORDER_ATOMIC);
  var code = ''
  if(value_selector && value_action){
    code = '$(\''+value_selector+'\').'+value_action;
  }
  return code;
};
Blockly.JavaScript.dom_select_id = function() {
  var text_id = this.getTitleValue('id');
  // TODO: Assemble JavaScript into code variable.
  var code = '#'+text_id;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
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
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_select_elements = function() {
  var text_el_type = this.getTitleValue('el_type');
  var code = '' + text_el_type;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
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
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_select_class = function() {
  var text_class = this.getTitleValue('class');
  // TODO: Assemble JavaScript into code variable.
  var code = '.'+text_class;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
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
    this.setOutput(true);
    this.setTooltip('');
  }
}

//ACTIONS:

//Replace Text:
Blockly.Language.dom_replace_text = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(65);
    this.appendValueInput("newText")
        .setCheck("String")
        .appendTitle("Replace Text With");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.JavaScript.dom_replace_text = function() {
  var value_newtext = Blockly.JavaScript.valueToCode(this, 'newText', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'text('+value_newtext+');\n';
  
  return [code, Blockly.JavaScript.ORDER_NONE];
};