// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">môi trường lập trình trực quan</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Xem code đã tạo bằng JavaScript.</span><span id="linkTooltip">Lưu và lấy địa chỉ liên kết.</span><span id="runTooltip">Chạy chương trình.</span><span id="runProgram">Chạy</span><span id="resetProgram">Trở Về</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Lôgit</span><span id="catLoops">Loops</span><span id="catMath">Toán</span><span id="catText">Văn bản</span><span id="catLists">Danh sách</span><span id="catColour">Màu</span><span id="catVariables">Biến</span><span id="catProcedures">Thủ tục</span><span id="httpRequestError">Hoạt động bị trục trặc, không thực hiện được yêu cầu của bạn.</span><span id="linkAlert">Dùng liên kết này để chia sẽ chương trình của bạn:\n\n%1</span><span id="hashError">Không tìm thấy chương trình được lưu ở \'%1\'.</span><span id="xmlError">Không mở được chương trình của bạn.  Có thể nó nằm trong một phiên bản khác của Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">đi tới</span><span id="Maze_turnLeft">quay qua trái</span><span id="Maze_turnRight">quay qua phải</span><span id="Maze_doCode">hãy</span><span id="Maze_elseCode">nếu không</span><span id="Maze_pathAhead">nếu có đường phía trước</span><span id="Maze_pathLeft">nếu có đường bên trái</span><span id="Maze_pathRight">nếu có đường bên phải</span><span id="Maze_repeatUntil">lặp lại cho đến</span><span id="Maze_moveForwardTooltip">Di chuyển Pegman tới một bước. </span><span id="Maze_turnTooltip">Quay Pegman qua bên trái hoặc bên phải 90 độ.</span><span id="Maze_ifTooltip">Nếu có đường ở hướng đấy, hãy thực hiện các lệnh \\nđưa ra. </span><span id="Maze_ifelseTooltip">Nếu có đường ở hướng đấy, hãy thực hiện các lệnh \\nthứ nhất. Nếu không, thực hiện các lệnh thứ hai. </span><span id="Maze_whileTooltip">Thực hiện các lệnh được bao gồm cho đến khi đến \\nđích </span><span id="Maze_capacity0">Bạn còn 0 mảnh.</span><span id="Maze_capacity1">Bạn còn 1 mảnh.</span><span id="Maze_capacity2">Bạn còn %1 mảnh.</span><span id="Maze_nextLevel">Chúc mừng! Bạn đã sẵn sàng qua vòng %1?</span><span id="Maze_finalLevel">Chúc mừng! Bạn đã giải xong vòng cuối cùng.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Ma trận</span> &nbsp; ';
  for (var i186 = 1; i186 < 11; i186++) {
    output += ' ' + ((i186 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i186) + '</span>' : (i186 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Một chương trình là một chuỗi các lệnh. Chồng hai mảnh \'đi tới\' lên nhau để giúp tớ đến đích.';
      break;
    case 2:
      output += 'Chuỗi lệnh gì sẽ giải ma trận này?';
      break;
    case 3:
      output += 'Bộ nhớ của máy vi tính có hạn. Ở vòng này bạn chỉ được dùng hai mảnh để đến đích. Mảnh \'lặp lại\' sẽ chạy một lệnh nhiều lần.';
      break;
    case 4:
      output += 'Để giải ma trận này, bạn chỉ được dùng năm mảnh.';
      break;
    case 5:
      output += 'Pegman will have to turn left when he cannot go straight.';
      break;
    case 6:
      output += 'Mảnh \'nếu [điều kiện]\' nhìn vào điều kiện rồi chỉ thực hiện lệnh nếu có điều kiện ấy. Hãy thử rẽ trái nếu có đường bên trái.';
      break;
    case 7:
      output += 'Ma trận này nhìn rắc rối hơn cái trước, nhưng thực sự chúng cũng khá giống nhau.';
      break;
    case 8:
      output += 'Bạn có thể dùng hơn một mảnh \'nếu...\', để xử lý nhiều điều kiện khác nhau.';
      break;
    case 9:
      output += 'Mảnh \'nếu-nếu không\' sẽ giúp bạn. Nó sẽ thực hiện một trong hai lệnh hoặc nhóm lệnh đưa ra. Lệnh ở \'nếu không\' chỉ chạy khi điều kiện ấy không có thật.';
      break;
    case 10:
      output += 'Bạn có thể giải cái ma trận rắc rối này? Gợi ý: Thử đi sát theo một bức tường, y như bạn đang giữ một tay theo suốt bức tường ấy, dù nó rẻ phải hay trái.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Xem code đã tạo bằng JavaScript." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Lưu và lấy địa chỉ liên kết." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Chạy</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title="Put the character back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Trở Về</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Ở vòng này, bạn cần gắn chồng các mảnh lệnh lên nhau trong khoảng trắng (còn được gọi là sân chơi) để tạo chuỗi mệnh lệnh cần thiết.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};
