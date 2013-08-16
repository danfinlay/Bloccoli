/**
 * Blockly Apps: Turtle Graphics Blocks
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Turtle Graphics application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.Language.draw_move = {
  // Block for moving forward or backwards.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(
            Blockly.Language.draw_move.DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Turtle_moveTooltip'));
  }
};

Blockly.Language.draw_move.DIRECTIONS =
    [[BlocklyApps.getMsg('Turtle_moveForward'), 'moveForward'],
     [BlocklyApps.getMsg('Turtle_moveBackward'), 'moveBackward']];

Blockly.JavaScript.draw_move = function() {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + this.getTitleValue('DIR') +
      '(' + value + ', \'block_id_' + this.id + '\');\n';
};


Blockly.Language.draw_turn = {
  // Block for turning left or right.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(
            Blockly.Language.draw_turn.DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Turtle_turnTooltip'));
  }
};

Blockly.Language.draw_turn.DIRECTIONS =
    [[BlocklyApps.getMsg('Turtle_turnRight'), 'turnRight'],
     [BlocklyApps.getMsg('Turtle_turnLeft'), 'turnLeft']];

Blockly.JavaScript.draw_turn = function() {
  // Generate JavaScript for turning left or right.
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + this.getTitleValue('DIR') +
      '(' + value + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_width = {
  // Block for setting the width.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('WIDTH')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('Turtle_setWidth'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Turtle_widthTooltip'));
  }
};

Blockly.JavaScript.draw_width = function() {
  // Generate JavaScript for setting the width.
  var width = Blockly.JavaScript.valueToCode(this, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'Turtle.penWidth(' + width + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_pen = {
  // Block for pen up/down.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'PEN');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Turtle_penTooltip'));
  }
};

Blockly.Language.draw_pen.STATE =
    [[BlocklyApps.getMsg('Turtle_penUp'), 'penUp'],
     [BlocklyApps.getMsg('Turtle_penDown'), 'penDown']];

Blockly.JavaScript.draw_pen = function() {
  // Generate JavaScript for pen up/down.
  return 'Turtle.' + this.getTitleValue('PEN') +
      '(\'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_colour = {
  // Block for setting the colour.
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle(BlocklyApps.getMsg('Turtle_setColour'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Turtle_colourTooltip'));
  }
};

Blockly.JavaScript.draw_colour = function() {
  // Generate JavaScript for setting the colour.
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.penColour(' + colour + ', \'block_id_' +
      this.id + '\');\n';
};

Blockly.Language.turtle_visibility = {
  // Block for changing turtle visiblity.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'VISIBILITY');
    this.setTooltip(BlocklyApps.getMsg('Turtle_turtleVisibilityTooltip'));
  }
};

Blockly.Language.turtle_visibility.STATE =
    [[BlocklyApps.getMsg('Turtle_hideTurtle'), 'hideTurtle'],
     [BlocklyApps.getMsg('Turtle_showTurtle'), 'showTurtle']];

Blockly.JavaScript.turtle_visibility = function() {
  // Generate JavaScript for changing turtle visibility.
  return 'Turtle.' + this.getTitleValue('VISIBILITY') +
      '(\'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_print = {
  // Block for printing text.
  helpUrl: BlocklyApps.getMsg('Turtle_printHelpUrl'),
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendTitle(BlocklyApps.getMsg('Turtle_print'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Turtle_printTooltip'));
  }
};

Blockly.JavaScript.draw_print = function() {
  // Generate JavaScript for printing text.
  var argument0 = String(Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return 'Turtle.drawPrint(' + argument0 + ', \'block_id_' +
      this.id + '\');\n';
};

Blockly.Language.draw_font = {
  // Block for setting the font.
  helpUrl: BlocklyApps.getMsg('Turtle_fontHelpUrl'),
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Turtle_font'))
        .appendTitle(new Blockly.FieldDropdown(this.FONTLIST), 'FONT');
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Turtle_fontSize'))
        .appendTitle(new Blockly.FieldTextInput('18',
                     Blockly.FieldTextInput.nonnegativeIntegerValidator),
                     'FONTSIZE');
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STYLE), 'FONTSTYLE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Turtle_fontTooltip'));
  }
};

Blockly.Language.draw_font.FONTLIST =
    // Common font names (intentionally not localized)
    [['Arial', 'Arial'], ['Courier New', 'Courier New'], ['Georgia', 'Georgia'],
     ['Impact', 'Impact'], ['Times New Roman', 'Times New Roman'],
     ['Trebuchet MS', 'Trebuchet MS'], ['Verdana', 'Verdana']];

Blockly.Language.draw_font.STYLE =
    [[BlocklyApps.getMsg('Turtle_fontNormal'), 'normal'],
     [BlocklyApps.getMsg('Turtle_fontItalic'), 'italic'],
     [BlocklyApps.getMsg('Turtle_fontBold'), 'bold']];

Blockly.JavaScript.draw_font = function() {
  // Generate JavaScript for setting the font.
  return 'Turtle.drawFont(\'' + this.getTitleValue('FONT') + '\',' +
      Number(this.getTitleValue('FONTSIZE')) + ',\'' +
      this.getTitleValue('FONTSTYLE') + '\', \'block_id_' +
      this.id + '\');\n';
};
