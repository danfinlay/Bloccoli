exports.startLoading = function(){
    $(window.parent.document).find('#shareDialog .question').hide();
    $(window.parent.document).find('#shareLoading').show();
    $(window.parent.document).find("#shareDialog h3").text('Loading...');
}

function stopLoading(message){
  console.log("Stop loading requested with message: "+message);

    $(window.parent.document).find('#shareLoading').hide();
    $(window.parent.document).find("#shareDialog h3").html(message);
}

exports.stopLoading = stopLoading;

exports.shareDialog = function(){
    $(window.parent.document).find('#shareDialog .question').show();
    $(window.parent.document).find("#shareDialog h3").text('Share this Project!');
    $(window.parent.document).find('#shareLoading').hide();
    $(window.parent.document).find("#shareDialog").modal();
}

exports.doneLoadingNewProject = function(newProjectId){
  var url = '/programs/'+newProjectId;
  var message = "<h2>Congratulations!</h2><p>Your new app can be found online at:<br><a href='"+url+"'>"+url+"</a>";
  stopLoading(message);
}