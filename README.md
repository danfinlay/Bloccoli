![logo](site/img/logo-small.png)
#Bloccoli
###A Modular [Blockly](http://code.google.com/p/blockly/) Programming Environment

Building on my thoughts from [this post](https://github.com/flyswatter/Blockly-Brainstorming).

Allows new modules full of javascript-compiling blocks to be added to its projects.  The basic functionality is working, now is the "adding modules" and "sanitizing the javascript" phase.  Adding modules should include adding a nice interface for browsing them.

Currently the app consists of two parts, client and server.

##Client
Bundled using Browserify.  Bundle any updates from the root via:

    $ browserify index.js -o site/js/bundle.js

##Server
A node.js program.  It exists in the "blockServer" folder.  From there, just run:

    $ node index.js

At the moment, the app is a basic ol' blockly instance, EXCEPT if you click "Add Blocks", and enter a valid module name, that module and its blocks will be added to the block menu on the left.

Currently "browser" is the only valid module.  It only features an "alert" block.  But the premise is simple!  New blocks can be added casually and easily!

##Contributing

If you'd like to add modules to Bloccoli, simply add them to the ./site/blocks folder.

Follow the browser.js format for success.  Note there are three steps:

Add a simple object representation of your module name and block names to the `window.parent.blocklyToolbox` list [as seen here](https://github.com/flyswatter/Bloccoli/blob/master/site/blocks/browser.js#L1).

After that, the remaining calls perfectly match what you'd do using Blockly's [block factory](http://blockly-demo.appspot.com/static/apps/blockfactory/index.html), so you'd ought to get familiar with it if you want to contribute.  Basically the block factory will give you both the block definition and the javascript compiling template to build the block and its Javascript definition.

Yes!  You can make the blocks do almost anything Javscript can do!  Sanitization of Javascript calls to avoid improper use of cookies, etc coming soon!