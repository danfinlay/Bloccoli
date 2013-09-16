![logo](site/img/logo-small.png)
#Bloccoli
###A Modular [Blockly](http://code.google.com/p/blockly/) Programming Environment
###Very Much in Beta.  No Saves are Sacred.

####[Follow us on Twitter](https://twitter.com/Bloccoli)
####Live instance running [here](http://bloccoli.org/)

Building on my thoughts from [this post](https://github.com/flyswatter/Blockly-Brainstorming).

Allows new modules full of javascript-compiling blocks to be added to its projects.  Basic block importing is working.  Saving and sharing anonymous projects is working.  Current roadmap, roughly in the order of my intentions:

*  Adding a rough interface to browse and discover projects.

*  Replace the "HTML" and "DOM" modules with a single "jQuery" one, basically wrap that whole library for the sake of DOM manipulation.

*  Refactor.  I want to try out this RESTify, and it'll give me a good chance to break into a more structured MVC folder structure, so growing in the future will be less painful.

*  Scope the modules' namespace!  Pass them a reference to the Blockly object, but keep them from having global scope, to avoid conflicts.

*  Implement User Accounts

*  Allow automated user block module submitting (Planning on javascript sanitization server-side by Caja).

-
Currently, "dom" and "html" are the only valid modules, and they are minimal and demo-ish.But the premise is simple!  New blocks can be added surprisingly easily!

##Contributing Block Modules

If you'd like to add modules to Bloccoli, simply add them to the ./site/blocks folder, and send me a pull request.  If there's lots of interest in contributing, I may automate this process in the future.

Follow the [dom.js format](https://github.com/flyswatter/Bloccoli/blob/master/site/blocks/dom.js) for success.  Note there are three steps:

###1. A representation of your menu tree.

If you have a flat block menu, you may find it easiest to arrange it as a javascript object as shown here, adding it to the global `blocklyToolbox` [as seen here](https://github.com/flyswatter/Bloccoli/blob/master/site/blocks/dom.js#L1).

If you need a more complex menu system, for example, categories within categories, you may append your required XML in [the blockly format](https://code.google.com/p/blockly/wiki/Toolbox) to the global `extensionXml` string.

If your menu system is so complex that it contains multiple categories, you may wnat to use this module: https://github.com/flyswatter/Blockly-Module-Maker

###2. Define the shape and behavior of each block.
###3. Define the compilation of these blocks into Javascript.

The remaining calls perfectly match what you'd do using Blockly's [block factory](http://blockly-demo.appspot.com/static/apps/blockfactory/index.html), so you'd ought to get familiar with it if you want to contribute.  Basically the block factory will give you both the block definition and the javascript compiling template to build the block and its Javascript definition.

Yes!  You can make the blocks do almost anything Javscript can do!  If you need a kick start, you can look at how some previous block modules were made in the `site/blocks` subdirectory.

####Future Block Module Hopes:
*More complete website interaction
*A 2D drawing/animation/games engine, like Processing.js, Paper.js, or Rafael.js
*A 3D modeling system like OpenJSCAD
*A 3D Games engine like Voxel.js
*More...

##Modifying the Core

###Current design:
The current app flow is fairly straightforward:  

Requesting a module adds an escaped JSON array of "bloccoliExtensions" to the URL query and reloads.

When the main page loads with a bloccoliExtensions query array, it creates a new iFrame, using the same query to the iframe's request url.

When the server finds this query array in an iframe request (always for ./site/frame.html), it injects script tags pointing to the requested modules before the Blockly.inject call.

For this reason, calls to Blockly made in modules are pure pre-injection Blockly interactions.  Be careful with those calls to global variables!  I will be adding some restrictions using Caja, and am open to suggestions for new restrictions to add.

Before including block definitions in your block set's .js file, you need to add an initialization object to the window.parent.blocklyToolbox list:

    window.parent.blocklyToolbox.push({
      name:'Sample Module',
      blocks:['uniquePrefix_yourFirstBlock', 'uniquePrefix_otherBlock', 'uniquePrefix_yourThirdBlock'],
      //Any required javascript should be linked here:
      scripts:[
        'http://www.site-that-permits-cross-domain-requests.com/dependency1.js',
        'http://www.other-site-that-permits-cross-domain-requests.com/dependency2.js'
      ]
    });

This function must be called for bloccoli to list the module's blocks in the menu.  The blockly menu xml is generated from this javascript object.

###Contributing to the Bloccoli Core:

####Client
Bundled using Browserify.  Bundle any updates from the root via:

    $ browserify client/index.js -o site/js/bundle.js

####Server
A node.js program.  It exists in the root directory.  From there, just run:

    $ node index.js