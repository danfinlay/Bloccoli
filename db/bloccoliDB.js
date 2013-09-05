var level = require('../node_modules/level');
var util = require('util');
var uniqueKey = require('./uniqueKeyGen');
var Q = require('../node_modules/Q');

module.exports = function BroccoliDB(name){

	var db = level(name, {
		'valueEncoding': 'json'
	});

	//Takes a callback that returns (er, uniqueKey), unique key if generated.
	db.putUnique = function(data, cb){
		uniqueKey(this, function(er, key){
			if(er) cb(er);
			db.put(key, data, function(er){
				if(er) cb(er);
				cb(null, key);
			})
		})
	}
	
	return db;

}