var level = require('../node_modules/level');
var util = require('util');
var uniqueKey = require('./uniqueKeyGen');

module.exports = function (name){
	return new LevelUnique(name, {
		'valueEncoding': 'json'
	});
}

function LevelUnique(){
	this = level(name, opts);
}

//Takes a callback that returns (er, uniqueKey), unique key if generated.
LevelUnique.prototype.putUnique = function(data, cb){
	uniqueKey(data, function(er, key){
		if(er) cb(er);
		this.put(key, data, function(er){
			if(er) cb(er);
			cb(null, key);
		})
	})
}

util.inherits(LevelUnique, level);