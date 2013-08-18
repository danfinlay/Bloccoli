

function UrlHandler(){
  this.getUrlVars = getUrlVars;
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
  var urlVals = getUrlVars();
  console.log("URL vals: "+JSON.stringify(urlVals));
  if(urlVals.bloccoliExtensions){
    window.bloccoliExtensions = eval(unescape(urlVals.bloccoliExtensions));
    console.log("Saved extensions: "+JSON.stringify(window.bloccoliExtensions));
  }
}

function reloadPageWithExtensions(){
  var newUrl = './';
  if(window.bloccoliExtensions){
    newUrl+='?bloccoliExtensions='+escape(JSON.stringify(window.bloccoliExtensions));
  }
  window.parent.location.href = newUrl;
}

function reloadPageWithExtension(newExtensionUrl){
  var newUrl = './';
  if(window.bloccoliExtensions){
    window.bloccoliExtensions.push(newExtensionUrl)
  }else{
    window.bloccoliExtensions = [newExtensionUrl];
  }
  reloadPageWithExtensions();
}

module.exports = function(){
  console.log("Initializing url handler.");
  var result = new UrlHandler();
  result.updateExtensions();
  // console.log("Extension urls embedded: "+JSON.stringify(window.bloccoliExtensions));
  return result;
}