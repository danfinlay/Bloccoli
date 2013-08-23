var level = require('./bloccoliDB');

var db = level('./programs');

// db.put('test1', {name:"Dan", age: 28}, function(er){
// 	if(er) return console.log("Problem", er);
// 	db.get('test1', function(er, value){
// 		if(er) return console.log("Problme with get.", er);

// 	console.log("Worked!: "+value);
// 	console.log("Stringified: "+JSON.stringify(value));
// 	});
// });


module.exports = function(){
	return new ProgramDB();
}

var ProgramDB = function(){
}

function newAnonymousProgram(programXML, callback){
	db.put('test1', {name:"Dan", age: 28}, function(er){
		if(er) return console.log("Problem", er);
		db.get('test1', function(er, value){
			if(er) return console.log("Problme with get.", er);

		console.log("Worked!: "+value);
		console.log("Stringified: "+JSON.stringify(value));
		});
	});
}

var Program = function(opts){

}