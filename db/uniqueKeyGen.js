var keyGen = require('generate-key');

module.exports = function(db, cb, tryLimit){
	findRandomKeyIn(db, cb, tryLimit || 10);
}

var findRandomKeyIn = function findRandomKeyIn(db, cb, triesRemaining){
	var randomKey = keyGen.generateKey(6);

	if(triesRemaining <= 0){
		return cb("Trouble accessing database, please try again later.");
	}
	triesRemaining--;

	db.get(randomKey, function(er, value){
		if(er && er.name === 'NotFoundError'){
			console.log("Unique key found: "+randomKey);
			return cb(null, randomKey);
		}
		findRandomKeyIn(db, cb, triesRemaining);
	})
}