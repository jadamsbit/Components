/* 

define the model
*/
var model = JSON.parse ('{ "components" : []}');
model.components.push({"id":1,"component":"engine", "hours":"2348", "projection":"16000"});
model.components.push({"id":2,"component":"torque", "hours":"2318", "projection":"8000"});
model.components.push({"id":3,"component":"transmission", "hours":"6245", "projection":"8000"});
model.components.push({"id":4,"component":"leftFinal", "hours":"5567", "projection":"6000"});
model.components.push({"id":5,"component":"rightFinal", "hours":"4378", "projection":"6000"});
model.components.push({"id":6,"component":"blade", "hours":"16245", "projection":"15000"});
model.components.push({"id":7,"component":"leftFrame", "hours":"12318", "projection":"11000"});
model.components.push({"id":8,"component":"rightFrame", "hours":"10458", "projection":"11000"});
model.components.push({"id":9,"component":"leftTrack", "hours":"8458", "projection":"20000"});
model.components.push({"id":10,"component":"rightTrack", "hours":"3567", "projection":"20000"});
model.components.push({"id":11,"component":"leftArm", "hours":"8318", "projection":"9000"});
model.components.push({"id":12,"component":"rightArm", "hours":"8458", "projection":"9000"});
model.components.push({"id":13,"component":"cuttingEdge", "hours":"1378", "projection":"4000"});
model.components.push({"id":14,"component":"leftBit", "hours":"245", "projection":"2000"});
model.components.push({"id":15,"component":"rightBit", "hours":"245", "projection":"2000"});




// console.log(model);

$( document ).ready(function() {
	  // Handler for .ready() called.

	  /*===== this will hide the fields for the add features area. =====*/
$('#showHide').hide();



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

});


function calculate(input){
	//get the model
	//loop thru each item in the model
	for(var m=0; m < model.components.length; m++){ // loop thru all items
		var oldValue = Number(model.components[m].hours); // at item 0, hours = 2,318 String
		// console.log("old: " + oldValue);
		// console.log("input: " + input);
		var whatEver = input + oldValue; // take input, 5 (integer), add to 2,318 String???
		// console.log("was: " + model.components[m].hours);
		// console.log("new: " + whatEver);
		model.components[m].hours = whatEver.toString(); // set hours to whatever value
		// console.log("now: " + model.components[m].hours);
	}
	//get the input from the submit button

	//apply the input to each hours value
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

/*===== this is the function to hide the add features button =====*/

$( "#addComp" ).click(function(evt) {
	$("#addComp").hide();
	$("#showHide").show();
	});


	/*===== this is the function that will take in the user info and hide the fields and buuton and show the add button. =====*/

$( "#insertComp" ).click(function(evt) {
	$("#addComp").show();
	$("#showHide").hide();
	var newComp = $("#newComp").val();
	var newHours = Number($("#newRoof").val());
	var newProj = Number($("#newProj").val());
	var newId = model.components.length + 1;
	model.components.push({"id":newId, "component":newComp, "hours":newHours, "projection":newProj});
	
	generateOutput()
	});



function generateOutput(){
	//loop through the json object
	 for(var i=0; i < model.components.length; i++){
	//output a line item for each json object found
	 $("#16_comp p").html(model.components[i].component)
	 $("#16_hours p").html(model.components[i].hours)
	 $("#16_proj p").html(model.components[i].projection)
	
	 }
	

}

function gernerateLineItem (id, name, hours, projection){
	//take perameters and create HTML for each line item
	//
}
// model.components[i].hours



