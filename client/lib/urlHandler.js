var _ = require('../../node_modules/underscore');

function UrlHandler(){
  this.getUrlVars = getUrlVars;
  this.extensions = [];
  this.updateExtensions = updateExtensions;
  this.reloadPageWithExtensions = reloadPageWithExtensions;
  this.reloadPageWithExtension = reloadPageWithExtension;
  var handler = this;
  $(window.parent.document).find('#addBlojule').on('click', function(e){

    e.preventDefault();
    var blojuleAddress = $(window.parent.document).find("#blojuleAddressField").val();
    handler.reloadPageWithExtension(blojuleAddress);

  });
}

var defaults = ["Logic", "Loops", "Math", "Text", "Lists", "Color", "Variables", "Functions"];
// UrlHandler.prototype.getUrlVars = getUrlVars;


function getUrlVars()
{
    var vars = [], hash;
    var source = document.referrer;
    var hashes = source.slice(source.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// UrlHandler.prototype.updateExtensions = updateExtensions;
function updateExtensions(){
  var currentExtensions = _.map(window.parent.blocklyToolbox, function(item){ return item.name; });
  var finals = [];

  currentExtensions.forEach(function(extensionName){
    if(!_.contains(defaults, extensionName)) 
      finals.push(extensionName);
  });

  // console.log("Current blocks identified: "+JSON.stringify(this.extensions));

  var urlVals = getUrlVars();
  if(urlVals['bloccoliExtensions']){
    // console.log("URL blocks added: "+JSON.stringify(eval(unescape(urlVals.bloccoliExtensions))));
    var urlBlocks = eval(unescape(urlVals.bloccoliExtensions));
    finals.concat(urlBlocks);
  }
  this.extensions = finals;
  // console.log("All together now: "+JSON.stringify(this.extensions));

}

function reloadPageWithExtension(newExtensionUrl){

  this.updateExtensions();
  this.extensions.push(newExtensionUrl);
  // console.log("Check out with the requested one: "+JSON.stringify(this.extensions));
  var newUrl = '/new?bloccoliExtensions='+escape(JSON.stringify(this.extensions));
  // console.log("Check out with the requested two: "+newUrl);
  window.parent.location.href = newUrl;
}


function reloadPageWithExtensions(){
  // console.log("Reloading page with extensions: "+JSON.stringify(this.extensions));
  var newUrl = '/new?bloccoliExtensions='+escape(JSON.stringify(this.extensions));

  // console.log("How do you like my pretty new href?"+newUrl);
  window.parent.location.href = newUrl;
}

module.exports = function(){
  // console.log("Initializing url handler.");
  var result = new UrlHandler();
  result.updateExtensions();
  // console.log("Extension urls embedded: "+JSON.stringify(window.bloccoliExtensions));
  return result;
}

