var bloccoliDB = require('./bloccoliDB');
var db = bloccoliDB('./usersDB');
var Q = require('../node_modules/q');
var _ = require('../node_modules/underscore');

function newUser(options){

  authenticate(options)

    return null;

}

function authenticate(options){
  return Q.all(_.map(authenticationMethods, function(method){return method(options);});
}

var authenticationMethods = [passwordAuth, emailAuth, usernameDupeCheck];

function createUserFromOptions(options){
  var newUser = {
      name: options.username,
      passHash: options.passHash,
      salt: options.salt,
      email: options.email,
      verified: false,
      programs: [],
      blojules: []

}