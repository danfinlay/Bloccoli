var level = require('./bloccoliDB');
var Q = require('../node_modules/q');
var db = level('./programs');
var putUnique = Q.nbind(db.putUnique, db);
var get = Q.nbind(db.get, db);
var _ = require('../node_modules/lodash');

var mostRecent500Projects = [];
function refreshMostRecent(){
  var unsorted = [];
  db.createReadStream()
  .on('data', function(data){
    console.log("Received: "+JSON.stringify(data));
    var parsedValue = data.value;
    console.log("parsedValue is a "+typeof parsedValue );
    if(parsedValue && parsedValue.xml){  
      unsorted.push({
        key: data.key,
        date: parsedValue.createdAt,
        title: parsedValue.title,
        description: parsedValue.description
      });
    }
  })
  .on('end', function(){
    console.log('' + unsorted.length + " programs identified");
    var sorted = unsorted.sort(function(a,b){
      return b.date - a.date;
    });
    mostRecent500Projects = sorted.slice(0,500);
    console.log("Most 500 recent: "+JSON.stringify(mostRecent500Projects));
  });
}
refreshMostRecent();
//Refresh recently posted every 15 minutes for now:
var recentlyPostedInterval = setInterval(refreshMostRecent, 900000);


function promiseMeProgramsFromTo(from, to){
  var deferred = Q.defer();

  var ops = [];
  for(var i = from; i < to; i++){
    if(mostRecent500Projects[i]){
      ops.push({
        type:'get', 
        key: mostRecent500Projects[i]
      });
    }
  }

  console.log("Making batch with: "+JSON.stringify(ops));
  db.batch(ops, function(er, programs){
    if(er){
      deferred.reject(er);
    }else{
      deferred.resolve(programs);
    }
  });

  return deferred.promise;
}

module.exports = function(){
	return new ProgramDB();
}

var ProgramDB = function(){
}

function newAnonymousProgram(postedObject){

  var deferred = Q.defer();

  console.log("Creating program from posted object: "+JSON.stringify(postedObject));

  var limitedDescription = postedObject.description.length > 500 ? postedObject.description.substring(0,500) : postedObject.description;
  var startDate = Date.now();
  var program = {
    xml: postedObject.code,
    createdAt: startDate,
    author: 'anon',
    scripts: postedObject.scripts,
    title: postedObject.title,
    description: limitedDescription
  }

  mostRecent500Projects = [{
    key: uniqueId,
    date: startDate,
    title: program.title,
    description: program.description
  }].concat(mostRecent500Projects);

  console.log("About to save program: "+JSON.stringify(program));

  putUnique(program).then(function(uniqueId){

    deferred.resolve(uniqueId);
  }, function(reason){p
    deferred.reject(reason);
  });

  return deferred.promise;
}

ProgramDB.prototype.newAnonymousProgram = newAnonymousProgram;

function programMenu(){
  return mostRecent500Projects;
}
ProgramDB.prototype.programMenu = programMenu;

function get(programId){
  var deferred = Q.defer();

  get(programId).then(function(program){
    deferred.resolve(program);
  }, function(reason){
    deferred.reject("Problem fetching requested program: "+reason);
  });

  return deferred.promise;
}

ProgramDB.prototype.get = get;
ProgramDB.prototype.promiseMeProgramsFromTo = promiseMeProgramsFromTo;