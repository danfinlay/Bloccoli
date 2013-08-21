Blockly.JavaScript.text = function (){return[window.Blockly.JavaScript.quote_(this.getTitleValue("TEXT")),Blockly.JavaScript.ORDER_ATOMIC]}
  
Blockly.Language.text = {
  helpUrl: 'http://en.wikipedia.org/wiki/String_(computer_science)',
  init: function (){this.setColour(160);this.appendDummyInput().appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote0.png",12,12)).appendTitle(new Blockly.FieldTextInput(""),"TEXT").appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote1.png",12,12));this.setOutput(!0,"String");this.setTooltip(Blockly.LANG_TEXT_TEXT_TOOLTIP)}
};

console.log("Attempting to add text to defaults");