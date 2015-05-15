/* 

define the model
*/





// console.log(model);

$( document ).ready(function() {
	  // Handler for .ready() called.	
	/*===== this will hide the fields for the add features area. =====*/
	$('#showHide').hide();

	$( "#submit" ).click(function(evt) {
		//get the input value
		var newValue = Number($("#input").val());
		//console.log(newValue);
		//run calculate
		calculate(newValue);
		//run update output
		updateOutput();
		checkLifeCycle();
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
		generateOutput()
	});

	// Show/Hide for the Exit button
	$("#out").click(function(evt) {
		$("#showHide").hide();
		$("#addComp").show();
	});

});


function calculate(input){
	//get the model
	//loop thru each item in the model
	for(var m=0; m < model.data.machines[model.selectedMachine].components.length; m++){ // loop thru all items
		var oldValue = Number(model.data.machines[model.selectedMachine].components[m].hours); // at item 0, hours = 2,318 String
		// console.log("old: " + oldValue);
		// console.log("input: " + input);
		var whatEver = input + oldValue; // take input, 5 (integer), add to 2,318 String???
		// console.log("was: " + model.components[m].hours);
		// console.log("new: " + whatEver);
		model.data.machines[model.selectedMachine].components[m].hours = whatEver.toString(); // set hours to whatever value
		// console.log("now: " + model.components[m].hours);
	}
}


function updateOutput(){
	//get the model
    // console.log(model);
	//loop thru each item in the model
	for(var i=0; i < model.data.machines[model.selectedMachine].components.length; i++){
		//update the corresponding id in html
		var currentComponent = model.data.machines[model.selectedMachine].components[i];
		$("#" + model.data.machines[model.selectedMachine].components[i].id + "_hours p").html(currentComponent['hours']);
		//console.log("#" + model.components[i].component + "_hours p")
	}
}


	// Input of the new data into the JSON object.
function generateOutput(){
	var newComp = $("#newComp").val();
	var newHours = Number($("#newRoof").val());
	var newProj = Number($("#newProj").val());
	var newId = model.data.machines[model.selectedMachine].components.length + 1;
	model.data.machines[model.selectedMachine].components.push({"id":newId, "component":newComp, "hours":newHours, "projection":newProj});
	//loop through the json object
	for(var i=0; i < model.data.machines[model.selectedMachine].components.length; i++){
	//output a line item for each json object found
	var id = model.data.machines[model.selectedMachine].components[i].id
	var name = model.data.machines[model.selectedMachine].components[i].component
	var hours = model.data.machines[model.selectedMachine].components[i].hours
	var projection = model.data.machines[model.selectedMachine].components[i].projection
	}
	generateLineItem(id,name,hours,projection)
}
 
	// Inital load of all information in the JSON to the HTML.
function initialize(){
		//loop through the json object
	 for(var i=0; i < model.data.machines[model.selectedMachine].components.length; i++){
		//output a line item for each json object found
		var id = model.data.machines[model.selectedMachine].components[i].id
		var name = model.data.machines[model.selectedMachine].components[i].component
		var hours = model.data.machines[model.selectedMachine].components[i].hours
		var projection = model.data.machines[model.selectedMachine].components[i].projection
		generateLineItem(id,name,hours,projection);
	}
}

function nuke (){
	$("#component").html("<h3>Component</h3>");
	$("#hours").html("<h3>Hours</h3>");
	$("#projection").html("<h3>Projection</h3>");
	$("#part-item-input-").html("<h3>Update</h3>");
	$("#adjust1").html("");
}

	// Generates the information and the new containers.
function generateLineItem (id, name, hours, projection){
		//take perameters and create HTML for each line item
	$("#component").append("<div class='comp' id='" + id + "_comp'><p>" + name + "</p> </div>");
	$("#hours").append("<div class='hours' id='" + id + "_hours'><p>" + hours + "</p> </div>");
	$("#projection").append("<div class='proj' id='" + id + "_proj'><p>" + projection + "</p> </div>");
	$("#part-item-input-").append("<div class='update' id='" + id + "_input'><input type='number' id='part-item-input-"+ id +"' value='0' min='0' max='24' step='.25'></input></div>");
	$("#adjust1").append("<div class='adjust' id='" + id + "_adjust'><button type='button' data-button='"+ id +"' class='btn btn-info updateRecordButton'>Adjust</button></div>");

	$( "#" + id + "_adjust button" ).click(function(evt) {
		var id = Number($(this).data('button')); 
		var newValue = Number($("#part-item-input-" + id).val());
		updateRecord(newValue, id);
		updateOutput();
		checkLifeCycle();
	});	
}

function updateRecord(newValue, componentID) {
	//loop through the model's
	for(var m=0; m < model.data.machines[model.selectedMachine].components.length; m++){ // loop thru all items
		var compID = Number(model.data.machines[model.selectedMachine].components[m].id);
		if (compID === componentID){
			var oldValue = Number(model.data.machines[model.selectedMachine].components[m].hours);
			var whatEver = newValue + oldValue;
			model.data.machines[model.selectedMachine].components[m].hours = whatEver.toString();
		} 
	}
}

function checkLifeCycle(){
 	for(var m=0; m < model.data.machines[model.selectedMachine].components.length; m++){ // loop thru all items
		if(parseInt(model.data.machines[model.selectedMachine].components[m].hours) > parseInt(model.data.machines[model.selectedMachine].components[m].projection)){
			alert("Maintenance Due Now On " + model.data.machines[model.selectedMachine].components[m].component.toUpperCase());
		}
		else if(parseInt(model.data.machines[model.selectedMachine].components[m].hours) > parseInt(model.data.machines[model.selectedMachine].components[m].projection) * 0.90){
			alert("Maintenance Due Soon On " + model.data.machines[model.selectedMachine].components[m].component.toUpperCase());
			console.log (model.data.machines[model.selectedMachine].components[m].component)
		}
		else
		{
		}
 	}
}


