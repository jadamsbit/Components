/* 

define the model
*/
var model = JSON.parse ('{ "components" : []}');
model.components.push({"component":"engine", "hours":"2348", "projection":"16000"});
model.components.push({"component":"torque", "hours":"2318", "projection":"8000"});
model.components.push({"component":"transmission", "hours":"6245", "projection":"8000"});
model.components.push({"component":"leftFinal", "hours":"5567", "projection":"6000"});
model.components.push({"component":"rightFinal", "hours":"4378", "projection":"6000"});
model.components.push({"component":"blade", "hours":"16245", "projection":"15000"});
model.components.push({"component":"leftFrame", "hours":"12318", "projection":"11000"});
model.components.push({"component":"rightFrame", "hours":"10458", "projection":"11000"});
model.components.push({"component":"leftTrack", "hours":"8458", "projection":"20000"});
model.components.push({"component":"rightTrack", "hours":"3567", "projection":"20000"});
model.components.push({"component":"leftArm", "hours":"8318", "projection":"9000"});
model.components.push({"component":"rightArm", "hours":"8458", "projection":"9000"});
model.components.push({"component":"cuttingEdge", "hours":"1378", "projection":"4000"});
model.components.push({"component":"leftBit", "hours":"245", "projection":"2000"});
model.components.push({"component":"rightBit", "hours":"245", "projection":"2000"});




console.log(model);

$( document ).ready(function() {
  // Handler for .ready() called.



/*
the model will contain
all values to be presented and updated

the model will be a json object

define the controller
the controller will contain two methods
method 1 update output
method 2 run calculations

define the view
the html

update the view
*/
updateOutput();

});


function calculate(input){
	//get the model
	//loop thru each item in the model
	for(var m=0; m < model.components.length; m++){ // loop thru all items
		var oldValue = Number(model.components[m].hours); // at item 0, hours = 2,318 String
		console.log("old: " + oldValue);
		console.log("input: " + input);
		var whatEver = input + oldValue; // take input, 5 (integer), add to 2,318 String???
		console.log("was: " + model.components[m].hours);
		console.log("new: " + whatEver);
		model.components[m].hours = whatEver.toString(); // set hours to whatever value
		console.log("now: " + model.components[m].hours);
	}
	//get the input from the submit button

	//apply the input to each hours value
}
function updateOutput(){
	//get the model
    console.log(model);
	//loop thru each item in the model
	for(var i=0; i < model.components.length; i++){
		//update the corresponding id in html
		var currentComponent = model.components[i];
		$("#" + model.components[i].component + "_hours p").html(currentComponent['hours']);
	}
}

$( "#submit" ).click(function(evt) {
	//get the input value
	var newValue = Number($("#input").val());
	//console.log(newValue);
	//run calculate
	calculate(newValue);
	//run update output
	updateOutput();

//	updateServer();
});