![logo](site/img/logo-small.png)
#Bloccoli
###A Modular [Blockly](http://code.google.com/p/blockly/) Programming Environment

####[Live instance running here](http://bloccoli.herokuapp.com/)

Building on my thoughts from [this post](https://github.com/flyswatter/Blockly-Brainstorming).

Allows new modules full of javascript-compiling blocks to be added to its projects.  Basic block importing is working, major remaining tasks:

1. Compile a website from the generated source code.  Include a prerequisite scripts section for new modules to import accessory code.

1.  Decide on the exact run method.  Have a frame next to the block frame?  Pop the code up in a new window?  Something else?  Definitely provide an html-download feature.

4.  Automate Javascript Sanitization.

5.  Add modules.  

6.  Create interface for contributing & exploring modules.
-

Currently, "browser" is the only valid module.  It only features an "alert" block.  But the premise is simple!  New blocks can be added casually and easily!

##Contributing Block Modules

If you'd like to add modules to Bloccoli, simply add them to the ./site/blocks folder.

Follow the [browser.js format](https://github.com/flyswatter/Bloccoli/blob/master/site/blocks/browser.js) for success.  Note there are three steps:

Add a simple object representation of your module name and block names to the `window.parent.blocklyToolbox` list [as seen here](https://github.com/flyswatter/Bloccoli/blob/master/site/blocks/browser.js#L1).

After that, the remaining calls perfectly match what you'd do using Blockly's [block factory](http://blockly-demo.appspot.com/static/apps/blockfactory/index.html), so you'd ought to get familiar with it if you want to contribute.  Basically the block factory will give you both the block definition and the javascript compiling template to build the block and its Javascript definition.

Yes!  You can make the blocks do almost anything Javscript can do!  Sanitization of Javascript calls to avoid improper use of cookies, etc coming soon!

##Modifying the Core

###Current design:
The current app flow is fairly straightforward:  

Requesting a module adds an escaped JSON array of "bloccoliExtensions" to the URL query and reloads.

When the main page loads with a bloccoliExtensions query array, it creates a new iFrame, using the same query into its request url.

When the server finds this array in an iframe request (always for ./site/frame.html), it injects script tags pointing to the requested modules before the Blockly.inject call.

For this reason, calls to Blockly made in modules are pure pre-injection Blockly interactions.  In fact, they're all fairly unrestricted javascript, except that before I allow public uploading of modules, I'll be sanitizing the submitted Javascript automatically.

Injecting dependencies for the blocks' generated code should be done in the block module like so:

    window.parent.blocklyToolbox.push({
      name:'Sample Module',
      blocks:['uniquePrefix_blockId', 'uniquePrefix_otherBlock', 'uniquePrefix_etc'],
      //Any required javascript should be linked here:
      scripts:[
        'http://www.site-that-permits-cross-domain-requests.com/dependency1.js',
        'http://www.other-site-that-permits-cross-domain-requests.com/dependency2.js'
      ]
    });

This function must be called for bloccoli to list the module's blocks in the menu.  The blockly menu xml is generated from this javascript object.

####Client
Bundled using Browserify.  Bundle any updates from the root via:

    $ browserify client/index.js -o site/js/bundle.js

####Server
A node.js program.  It exists in the root directory.  From there, just run:

    $ node index.js