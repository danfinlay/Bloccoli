var _ = require('../../node_modules/underscore');

function UrlHandler(){
  this.getUrlVars = getUrlVars;
  this.extensions = [];
  this.reloadPageWithExtension = reloadPageWithExtension;
  var handler = this;
  $(window.parent.document).find('#addBlojule').on('click', function(e){

    e.preventDefault();
    var blojuleAddress = $(window.parent.document).find("#blojuleAddressField").val();
    handler.reloadPageWithExtension(blojuleAddress);
    // console.log("requesting "+blojuleAddress);

    $(window.parent.document).find("#addBlocksDialog").modal('hide');
  });



}

var defaults = ["logic", "loops", "math", "text", "lists", "color", "variables", "functions"];
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

function reloadPageWithExtension(newExtensionUrl){

  window.parent.blocklyToolbox.push({name:newExtensionUrl});
  var requestTools = 
  for(var i = 0, iLen = window.parent.blocklyToolbox.length; i < iLen; i++){
    if(!_.contains(defaults, window.parent.blocklyToolbox[i].name)){
      requestTools.push(window.parent.blocklyToolbox[i]);
    }
  }
  BlocklyStorage.link();
  window.parent.refreshToolboxWith(requestTools);

}

module.exports = function(){
  // console.log("Initializing url handler.");
  var result = new UrlHandler();
  // console.log("Extension urls embedded: "+JSON.stringify(window.bloccoliExtensions));
  return result;
}

