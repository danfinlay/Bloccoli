new function(){

  this.name = 'Browser';
  this.Language = {};
  this.JavaScript = {};
  // console.log("About to set language");

  this.Language.browser_alert = {
    helpUrl: 'http://www.example.com/',
    init: function() {
      this.setColour(210);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendValueInput("alertText")
          .setCheck("String")
          .appendTitle("alert");
      this.setTooltip('');
    }
  };

  //Generator:
  this.JavaScript.browser_alert = function() {
    var value_alerttext = Blockly.JavaScript.valueToCode(this, 'alertText', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'alert('+value_alerttext+')';
    return code;
  };

}();