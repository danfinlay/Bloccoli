var level = require('./bloccoliDB');
var Q = require('../node_modules/q');
var db = level('./programs');
var putUnique = Q.nbind(db.putUnique, db);
var get = Q.nbind(db.get, db);

module.exports = function(){
	return new ProgramDB();
}

var ProgramDB = function(){
}

function newAnonymousProgram(postedObject){

  var deferred = Q.defer();

  var program = {
    xml: postedObject.code,
    createdAt: Date.now(),
    author: 'anon',
    scripts: postedObject.scripts
  }

  putUnique(program).then(function(uniqueId){
    deferred.resolve(uniqueId);
  }, function(reason){
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