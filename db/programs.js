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
        date: parsedValue.createdAt
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

  var requested = mostRecent500Projects.slice(from, to);
  var promises = _.map(requested, function(obj){
    return get(obj.key);
  });
  return Q.all(promises);
}

module.exports = function(){
	return new ProgramDB();
}

var ProgramDB = function(){
}

function newAnonymousProgram(postedObject){

  var deferred = Q.defer();

  console.log("Creating program from posted object: "+JSON.stringify(postedObject));

  var program = {
    xml: postedObject.code,
    createdAt: Date.now(),
    author: 'anon',
    scripts: postedObject.scripts
  }

  console.log("About to save program: "+JSON.stringify(program));

  putUnique(program).then(function(uniqueId){
    deferred.resolve(uniqueId);
  }, function(reason){p
    deferred.reject(reason);
  });

  return deferred.promise;
}

ProgramDB.prototype.newAnonymousProgram = newAnonymousProgram;

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