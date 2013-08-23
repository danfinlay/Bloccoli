var level = require('./bloccoliDB');
// var uniqueKey = require('./uniqueKeyGen');

var db = level('./testDB');

// uniqueKey(db, function(er, key){
// 	if(!er){
// 		db.put(key, {xml: "<testXML></testXML>"}, function(er){
// 			if(!er){

// 			}
// 		})
// 	}
// })

db.put('test1', {name:"Dan", age: 28}, function(er){
	if(er) return console.log("Problem", er);
	db.get('test1', function(er, value){
		if(er) return console.log("Problme with get.", er);

		console.log("Worked: tringified: "+JSON.stringify(value));
	});
});

db.putUnique({name:"Pam", age: 15}, function(er, key){
	if(er) return console.log("Problem with unique put", er);
	console.log("Put uniquely: "+key);

	db.get(key, function(er, value){
		if(er) return console.log("Problme with get.", er);

	console.log("Worked!: "+key);
	console.log("Stringified: "+JSON.stringify(value));
	});
});


// module.exports = function(){
// 	return new ProgramDB();
// }

// var ProgramDB = function(){
// }

// function newAnonymousProgram(programXML, callback){
// 	db.put('test1', {name:"Dan", age: 28}, function(er){
// 		if(er) return console.log("Problem", er);
// 		db.get('test1', function(er, value){
// 			if(er) return console.log("Problme with get.", er);

// 		console.log("Worked!: "+value);
// 		console.log("Stringified: "+JSON.stringify(value));
// 		});
// 	});
// }

// var Program = function(opts){

// }