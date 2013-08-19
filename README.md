![logo](site/img/logo-small.png)
#Bloccoli
###A Modular [Blockly](http://code.google.com/p/blockly/) Programming Environment

Building on my thoughts from [this post](https://github.com/flyswatter/Blockly-Brainstorming).

Allows new modules full of javascript-compiling blocks to be added to its projects.  The basic functionality is working, now is the "adding modules" and "sanitizing the javascript" phase.  Adding modules should include adding a nice interface for browsing them.

Currently "browser" is the only valid module.  It only features an "alert" block.  But the premise is simple!  New blocks can be added casually and easily!

##Contributing Block Modules

If you'd like to add modules to Bloccoli, simply add them to the ./site/blocks folder.

Follow the [browser.js format](https://github.com/flyswatter/Bloccoli/blob/master/site/blocks/browser.js) for success.  Note there are three steps:

Add a simple object representation of your module name and block names to the `window.parent.blocklyToolbox` list [as seen here](https://github.com/flyswatter/Bloccoli/blob/master/site/blocks/browser.js#L1).

After that, the remaining calls perfectly match what you'd do using Blockly's [block factory](http://blockly-demo.appspot.com/static/apps/blockfactory/index.html), so you'd ought to get familiar with it if you want to contribute.  Basically the block factory will give you both the block definition and the javascript compiling template to build the block and its Javascript definition.

Yes!  You can make the blocks do almost anything Javscript can do!  Sanitization of Javascript calls to avoid improper use of cookies, etc coming soon!

##Modifying the Core

Currently the app consists of two parts, client and server.

###Client
Bundled using Browserify.  Bundle any updates from the root via:

    $ browserify index.js -o site/js/bundle.js

###Server
A node.js program.  It exists in the "blockServer" folder.  From there, just run:

    $ node index.js

####Current design:
The current app flow is fairly straightforward:  

Requesting a module adds it to an escaped JSON array as a "bloccoliExtensions" URL query.

The server parses out this array, and looks for .js files with the requested module names, and pipes their contents into the frame.html file's "frameInitScript" script tag.

Calls to Blockly made in modules are pure pre-injection Blockly interactions.

For people familiar to blockly, the only strange part may be the Javascript object that represents the menu item and its member names, but once you notice that I'm just using that JSON object to generate the menu XML used by blockly, you'll realize I just thought it was a simpler API, and hopefully you'll agree.  If I get some good arguments for why it isn't, maybe I'll switch to XML.  I'm not looking forward to that if it's the case.  Better early than late, though.
