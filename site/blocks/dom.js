window.parent.blocklyToolbox.push({
  name:'DOM Selectors',
  blocks:['browser_alert'],
  scripts:['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js']
});

Blockly.Language.browser_alert = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(210);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendValueInput("alertText").setCheck("String").appendTitle("alert");
    this.setTooltip('');
  }
};

Blockly.JavaScript.browser_alert = function() {
  var value_alerttext = Blockly.JavaScript.valueToCode(this, 'alertText', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'alert('+value_alerttext+')';
  return code;
}