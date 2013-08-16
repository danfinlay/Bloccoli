/**
 * Visual Blocks Editor
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
 * @fileoverview Text input field.  Used for editable titles and variables.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldTextInput');

goog.require('Blockly.Field');
goog.require('goog.asserts');
goog.require('goog.userAgent');


/**
 * Class for an editable text field.
 * @param {string} text The initial content of the field.
 * @param {Function} opt_changeHandler An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns the accepted text or null to abort
 *     the change.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldTextInput = function(text, opt_changeHandler) {
  Blockly.FieldTextInput.superClass_.constructor.call(this, text);

  this.changeHandler_ = opt_changeHandler;
};
goog.inherits(Blockly.FieldTextInput, Blockly.Field);

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldTextInput.prototype.CURSOR = 'text';

/**
 * Dispose of all DOM objects belonging to this editable field.
 */
Blockly.FieldTextInput.prototype.dispose = function() {
  Blockly.widgetDiv.hideIfField(this);
  Blockly.FieldTextInput.superClass_.dispose.call(this);
};

/**
 * Set the text in this field.
 * @param {?string} text New text.
 * @override
 */
Blockly.FieldTextInput.prototype.setText = function(text) {
  if (text === null) {
    // No change if null.
    return;
  }
  if (this.changeHandler_) {
    var validated = this.changeHandler_(text);
    // If the new text is invalid, validation returns null.
    // In this case we still want to display the illegal result.
    if (validated !== null && validated !== undefined) {
      text = validated;
    }
  }
  Blockly.Field.prototype.setText.call(this, text);
};

/**
 * Show the inline free-text editor on top of the text.
 * @private
 */
Blockly.FieldTextInput.prototype.showEditor_ = function() {
  if (goog.userAgent.MOBILE) {
    // Mobile browsers have issues with in-line textareas (focus & keyboards).
    var newValue = window.prompt(Blockly.MSG_CHANGE_VALUE_TITLE, this.text_);
    if (this.changeHandler_) {
      var override = this.changeHandler_(newValue);
      if (override !== undefined) {
        newValue = override;
      }
    }
    if (newValue !== null) {
      this.setText(newValue);
    }
    return;
  }

  Blockly.widgetDiv.show(this, Blockly.FieldTextInput.dispose_);
  var div = Blockly.widgetDiv.DIV;
  // Create the input.
  var htmlInput = goog.dom.createDom('input', 'blocklyHtmlInput');
  Blockly.FieldTextInput.htmlInput_ = htmlInput;
  div.appendChild(htmlInput);

  htmlInput.value = htmlInput.defaultValue = this.text_;
  htmlInput.oldValue_ = null;
  this.validate_();
  this.resizeEditor_();
  htmlInput.focus();
  htmlInput.select();

  // Bind to blur -- close the editor on loss of focus.
  htmlInput.onBlurWrapper_ =
      Blockly.bindEvent_(htmlInput, 'blur', this, this.onHtmlInputBlur_);
  // Bind to keyup -- trap Enter and Esc; resize after every keystroke.
  htmlInput.onKeyUpWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
  // Bind to keyPress -- repeatedly resize when holding down a key.
  htmlInput.onKeyPressWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keypress', this, this.onHtmlInputChange_);
  var workspaceSvg = this.sourceBlock_.workspace.getCanvas();
  htmlInput.onWorkspaceChangeWrapper_ =
      Blockly.bindEvent_(workspaceSvg, 'blocklyWorkspaceChange', this,
      this.resizeEditor_);
};

/**
 * Handle a blur event on an editor.
 * @param {!Event} e Blur event.
 * @private
 */
Blockly.FieldTextInput.prototype.onHtmlInputBlur_ = function(e) {
  this.closeEditor_(true);
};

/**
 * Handle a change to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(e) {
  if (e.keyCode == 13) {
    // Enter
    this.closeEditor_(true);
  } else if (e.keyCode == 27) {
    // Esc
    this.closeEditor_(false);
  } else {
    // Update source block.
    var htmlInput = Blockly.FieldTextInput.htmlInput_;
    var text = htmlInput.value;
    if (text !== htmlInput.oldValue_) {
      htmlInput.oldValue_ = text;
      this.setText(text);
      this.validate_();
    } else if (goog.userAgent.WEBKIT) {
      // Cursor key.  Render the source block to show the caret moving.
      // Chrome only (version 26, OS X).
      this.sourceBlock_.render();
    }
  }
};

/**
 * Check to see if the contents of the editor validates.
 * Style the editor accordingly.
 * @private
 */
Blockly.FieldTextInput.prototype.validate_ = function() {
  var valid = true;
  goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);
  var htmlInput = /** @type {!Element} */ (Blockly.FieldTextInput.htmlInput_);
  if (this.changeHandler_) {
    valid = this.changeHandler_(htmlInput.value);
  }
  if (valid === null) {
    Blockly.addClass_(htmlInput, 'blocklyInvalidInput');
  } else {
    Blockly.removeClass_(htmlInput, 'blocklyInvalidInput');
  }
};

/**
 * Resize the editor and the underlying block to fit the text.
 * @private
 */
Blockly.FieldTextInput.prototype.resizeEditor_ = function() {
  var div = Blockly.widgetDiv.DIV;
  var bBox = this.group_.getBBox();
  div.style.width = bBox.width + 'px';
  var xy = Blockly.getAbsoluteXY_(/** @type {!Element} */ (this.borderRect_));
  // In RTL mode block titles and LTR input titles the left edge moves,
  // whereas the right edge is fixed.  Reposition the editor.
  if (Blockly.RTL) {
    var borderBBox = this.borderRect_.getBBox();
    xy.x += borderBBox.width;
    xy.x -= div.offsetWidth;
  }
  // Shift by a few pixels to line up exactly.
  xy.y += 1;
  if (goog.userAgent.WEBKIT) {
    xy.y -= 3;
  }
  div.style.left = xy.x + 'px';
  div.style.top = xy.y + 'px';
};

/**
 * Close the editor and optionally save the results.
 * @param {boolean} save True if the result should be saved.
 * @private
 */
Blockly.FieldTextInput.prototype.closeEditor_ = function(save) {
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  var text;
  if (save) {
    // Save the edit (if it validates).
    text = htmlInput.value;
    if (this.changeHandler_) {
      text = this.changeHandler_(text);
      if (text === null) {
        // Invalid edit.
        text = htmlInput.defaultValue;
      }
    }
  } else {
    // Canceling edit.
    text = htmlInput.defaultValue;
  }
  this.setText(text);
  Blockly.widgetDiv.hide();
  this.sourceBlock_.render();
};

/**
 * Ensure that only a number may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid number, or null if invalid.
 */
Blockly.FieldTextInput.numberValidator = function(text) {
  // TODO: Handle cases like 'ten', '1.203,14', etc.
  // 'O' is sometimes mistaken for '0' by inexperienced users.
  text = text.replace(/O/ig, '0');
  // Strip out thousands separators.
  text = text.replace(/,/g, '');
  var n = parseFloat(text || 0);
  return isNaN(n) ? null : String(n);
};

/**
 * Ensure that only a nonnegative integer may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid int, or null if invalid.
 */
Blockly.FieldTextInput.nonnegativeIntegerValidator = function(text) {
  var n = Blockly.FieldTextInput.numberValidator(text);
  if (n) {
    n = String(Math.max(0, Math.floor(n)));
  }
  return n;
};

/**
 * Dispose of the editable text field's elements.
 * @private
 */
Blockly.FieldTextInput.dispose_ = function() {
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  Blockly.unbindEvent_(htmlInput.onBlurWrapper_);
  Blockly.unbindEvent_(htmlInput.onKeyUpWrapper_);
  Blockly.unbindEvent_(htmlInput.onKeyPressWrapper_);
  Blockly.unbindEvent_(htmlInput.onWorkspaceChangeWrapper_);
  Blockly.FieldTextInput.htmlInput_ = null;
};
