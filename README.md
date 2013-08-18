![logo](site/img/logo-small.png)
#Bloccoli
###A Modular [Blockly](http://code.google.com/p/blockly/) Programming Environment

Building on my thoughts from [this post](https://github.com/flyswatter/Blockly-Brainstorming).

Currently the app consists of two parts, client and server.

Client is bundled using Browserify.  Bundle any updates from the root via:
  $ browserify index.js -o site/js/bundle.js

Server is a node.js program.  It exists in the "blockServer" folder.  Just run:
  $ node index.js