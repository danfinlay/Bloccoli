// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly (Блоклијев)</span><span id="codeTooltip">Погледај генерисани JavaScript код.</span><span id="linkTooltip">Сачувај и повежи са блоковима. </span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Покрени програм</span><span id="resetProgram">Поново постави</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Настао је проблем при извршењу траженог.</span><span id="linkAlert">Делите своје блокове употребом ове везе:\n\n%1</span><span id="hashError">Жао нам је, \'%1\' не одговара ни једној сачуваној Блокли датотеци.</span><span id="xmlError">Не могу да учитам датотеку коју сте сачували.  Можда је направљена другом верзијом Блоклија?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: fixed; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s; transition-timing-function: linear;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}#dialog button {min-width: 4em;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">иди напред</span><span id="Maze_turnLeft">окрени се лево</span><span id="Maze_turnRight">окрени се десно</span><span id="Maze_doCode">ради</span><span id="Maze_elseCode">у супротном</span><span id="Maze_pathAhead">ако постоји пут напред</span><span id="Maze_pathLeft">ако постоји пут лово</span><span id="Maze_pathRight">ако постоји пут десно</span><span id="Maze_repeatUntil">понављај док не</span><span id="Maze_moveForwardTooltip">Помера Штипаљка једну позицију напред.</span><span id="Maze_turnTooltip">Окреће Штипаљка лево или десно за 90 степени.</span><span id="Maze_ifTooltip">Ако постоји пут у датом правцу, онда уради следеће.</span><span id="Maze_ifelseTooltip">Ако постоји пут у датом правцу, \\nонда изврши прву групу акција. \\nУ супротном, уради другу групу \\nакција. </span><span id="Maze_whileTooltip">Понављај следеће акције док не комплетираш задатак.</span><span id="Maze_capacity0">Број блокова који ти је остао је 0.</span><span id="Maze_capacity1">Број блокова који ти је остао је 1.</span><span id="Maze_capacity2">Број блокова који ти је остао је %1.</span><span id="Maze_nextLevel">Честитамо! Да ли сте спремни да пређете на ниво %1?</span><span id="Maze_finalLevel">Честитамо! Решили сте последњи ниво.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly (Блоклијев)</a> : Лавиринт</span> &nbsp; ';
  for (var i186 = 1; i186 < 11; i186++) {
    output += ' ' + ((i186 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i186) + '</span>' : (i186 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Програм је низ исказа. Наређај неколико \'иди напред\' блокова да би ми помогао да достигнем циљ.';
      break;
    case 2:
      output += 'Који низ корака треба да се предузме да би се прошао пут?';
      break;
    case 3:
      output += 'Рачунари имају ограничену меморију. Дођи до краја пута употребивши само два блока. Искористи \'понављај\' да би извршио блок бише пута.';
      break;
    case 4:
      output += 'Достигни циљ употребом само пет блокова.';
      break;
    case 5:
      output += 'Pegman will have to turn left when he cannot go straight.';
      break;
    case 6:
      output += '\'ако\' блок ће урадити нешто једино ако је услов испуњен. Покушај окрет у лево ако постоји пут са леве стране.';
      break;
    case 7:
      output += 'Овај лавиринт изгледа сложеније него предходни, али није.';
      break;
    case 8:
      output += 'Можете да употребите више \'ако\' блокова.';
      break;
    case 9:
      output += 'Ако-у-супротмом блок урадиће једно или друго.';
      break;
    case 10:
      output += 'Можеш ли да решиш овај сложени лавиринт? Покшај да се крећеш уз леви зид.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Погледај генерисани JavaScript код." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Сачувај и повежи са блоковима. " onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Покрени програм</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title="Put the character back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Поново постави</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>На овом нивоу, потребно је да поређаш све блокове у бели радни простор.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};
