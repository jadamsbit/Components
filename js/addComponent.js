$( document ).ready(function() {
	  // Handler for .ready() called.	
	/*===== this will hide the fields for the add features area. =====*/
	$('#showHide').hide();
	$( "#hideWarnings" ).hide();
		$('#entry').hide();
		$('#compAdd').hide();

	$( "#submit" ).click(function(evt) {
		//get the input value
		var newValue = Number($("#input").val());
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

	/*===== this is the function to hide the warningdiv =====*/
	$( "#hideWarnings" ).click(function(evt) {
		$( "#warnings" ).toggle();
	});


	/*===== this is the function that will take in the user info and hide the fields and buuton and show the add button. =====*/
	$( "#insertComp" ).click(function(evt) {
		$("#addComp").show();
		
		$('#entry').show();
		generateOutput();
		checkLifeCycle();
		newComp.value= newComp.defaultValue;
		newRoof.value= newRoof.defaultValue;
		newProj.value= newProj.defaultValue;
		
	});

	// Show/Hide for the Exit button
	$("#out").click(function(evt) {
		$("#showHide").hide();
		$("#addComp").show();
	});
	$("#saveChange").click(function() {
		var id = $(this).data("component");
		var rename = $("#modifyModalComponent[placeholder]").val();
		var hours = $("#modifyModalHours[placeholder]").val();
		var projection = $("#modifyModalProjection[placeholder]").val();
		insertComponent(id, rename, hours, projection);
		});
});
function calculate(input){
		if(input == ""){
               alert("You need to enter a number!");
            }
        if (input>=1 && input<=200) {			//*validate that the manual entry is within specs**//

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

		}else{
		       alert("Must be between 1 and 200")		//****Issue an alert if a number greater than 200 is manually entered***//
		       return false}
}
function updateOutput(){
	//loop thru each item in the model
	for(var i=0; i < model.data.machines[model.selectedMachine].components.length; i++){
		//update the corresponding id in html
		var currentComponent = model.data.machines[model.selectedMachine].components[i];
		$("#" + model.data.machines[model.selectedMachine].components[i].id + "_hours p").html(currentComponent['hours']);
	}
}

// Input of the new data into the JSON object.
function generateOutput(){
	var newComp = $("#newComp").val();
	var valOK = true;
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
	if(newComp == "" || newComp.length > 8){
		 		$("#addComp").hide();
               alert("You need to enter component name that's eight characters or less!");
               var valOK = false;


            }

            if(valOK == true){
            	$("#showHide").hide();
	generateLineItem(id,name,hours,projection);
}
}
 
// Inital load of all information in the JSON to the HTML.
function initialize(){
		//loop through the json object
	if(model.selectedMachine != null){
		 for(var i=0; i < model.data.machines[model.selectedMachine].components.length; i++){
			//output a line item for each json object found
			var id = model.data.machines[model.selectedMachine].components[i].id
			var name = model.data.machines[model.selectedMachine].components[i].component
			var hours = model.data.machines[model.selectedMachine].components[i].hours
			var projection = model.data.machines[model.selectedMachine].components[i].projection
			generateLineItem(id,name,hours,projection);
		}
	}
}

function nuke (){
	$("#machineSelector").empty();
	$("#machineSelector").html('<li class="keep">Select a Machine</li><li class="keep"><a role="menuitem" id="showMachineForm">Add New Machine</a></li>');
	$("#newRow").empty();
	$("#component").html("<h3>Component</h3>");
	$("#hours").html("<h3>Hours</h3>");
	$("#projection").html("<h3>Projection</h3>");
	$("#part-item-input-").html("<h3>Update</h3>");
	$("#adjust1").html("");

	$("#eqNum").html();
	$("#eqInfo").html();
	$("#eqISD").html();

	$("#showMachineForm").click(function(evt){
	$("#showMachineForm").hide();
	$('#showHideMachine').show();
	});
}

	// Generates the information and the new containers.
// Generates the information and the new containers.
function generateLineItem (id, name, hours, projection){
		$("#newRow").append("<div class='row' id='" + id + "_nRow'><div data-component='"+ id +"'id='" + id + "_glyph' style='float:left' class=' size glyphicon glyphicon-trash col-lg-1 col-md-1 col-sm-1 col-xs-1'></div><a data-toggle='modal' href='#modal-id'><div class='comp col-lg-3 col-md-3 col-sm-3 col-xs-3' id='" + id + "_comp' data-component='"+ id +"'><p>" + name + "</p></div></a> <div class='hours col-lg-2 col-md-2 col-sm-2 col-xs-2' id='" + id + "_hours'><p>" + hours + "</p> </div> <div class='proj col-lg-2 col-md-2 col-sm-2 col-xs-2' id='" + id + "_proj'><p>" + projection + "</p> </div> <div class='update col-lg-1 col-md-1 col-sm-1 col-xs-2' id='" + id + "_input'><input type='number' id='part-item-input-"+ id +"' value='0' min='-24' max='10000' step='1'></input></div> <div class='adjust col-lg-2 col-md-2 col-sm-2 col-xs-2' id='" + id + "_adjust'><button type='button' data-button='"+ id +"' class='btn btn-info updateRecordButton'>Adjust</button></div></div>"); 
		console.log("#newRow");
		
		
		$( "#" + id + "_adjust button" ).click(function(evt) {
		var id = Number($(this).data('button')); 
		var newValue = Number($("#part-item-input-" + id).val());
			if(newValue == ""){
               alert("You need to enter a number!");
            }
		updateRecord(newValue, id);
		updateOutput();
		checkLifeCycle();
	});	
		$("#saveChange").click(function() {
		var id = $(this).data("component");
		var rename = $("#modifyModalComponent[placeholder]").val();
		var hours = $("#modifyModalHours[placeholder]").val();
		var projection = $("#modifyModalProjection[placeholder]").val();
		insertComponent(id, rename, hours, projection);
		$("#modal-id").modal("hide");
		});
		
		$("#" + id + "_comp").click(function() {
		var id = $(this).data("component");
		var index = model.getComponentIndex(id);
		console.log(id);
		var name = model.data.machines[model.selectedMachine].components[index].component;
		var hours = model.data.machines[model.selectedMachine].components[index].hours;
		var projection = model.data.machines[model.selectedMachine].components[index].projection;
		displayComponentInformationModal(id, name, hours, projection);
		});

		$("#" + id + "_glyph").click(function(){
		var id = $(this).data("component");
		var index = model.getComponentIndex(id);
		killIt(index);
		checkLifeCycle();
		// delete model.data.machines[model.selectedMachine].components[index].component;
		// delete model.data.machines[model.selectedMachine].components[index].hours;
		// delete model.data.machines[model.selectedMachine].components[index].projection;
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
	$( "#hideWarnings" ).hide();

$( "#warnings" ).empty();
	var newNowArray = [];
	var newSoonArray = [];
	var newSoon = false;
	var newNow = false;

 	for(var m=0; m < model.data.machines[model.selectedMachine].components.length; m++){
 		$( "#" + [m + 1] + "_hours" ).removeClass( "urgentWarning" );
		$( "#" + [m + 1] + "_proj" ).removeClass( "urgentWarning" );
		$( "#" + [m + 1] + "_comp" ).removeClass( "urgentWarning" );	
		$( "#" + [m + 1] + "_hours" ).removeClass( "earlyWarning" );
		$( "#" + [m + 1] + "_proj" ).removeClass( "earlyWarning" );
		$( "#" + [m + 1] + "_comp" ).removeClass( "earlyWarning" );	
					 // loop thru all items

		if(parseFloat(model.data.machines[model.selectedMachine].components[m].hours) >= parseFloat(model.data.machines[model.selectedMachine].components[m].projection)){
			$( "#" + [m + 1] + "_proj" ).addClass( "urgentWarning" );
			$( "#" + [m + 1] + "_hours" ).addClass( "urgentWarning" );
			$( "#" + [m + 1] + "_comp" ).addClass( "urgentWarning" );
			
			newNowArray.push (model.data.machines[model.selectedMachine].components[m].component);
			console.log(newNowArray);
			newNow=true;

		
			
		}  

		if(parseFloat(model.data.machines[model.selectedMachine].components[m].hours) > parseFloat(model.data.machines[model.selectedMachine].components[m].projection) * 0.89 && parseFloat(model.data.machines[model.selectedMachine].components[m].hours)< parseFloat(model.data.machines[model.selectedMachine].components[m].projection) ){
			$( "#" + [m + 1] + "_hours" ).addClass( "earlyWarning" );
			$( "#" + [m + 1] + "_proj" ).addClass( "earlyWarning" );
			$( "#" + [m + 1] + "_comp" ).addClass( "earlyWarning" );
			newSoonArray.push (model.data.machines[model.selectedMachine].components[m].component);
			console.log(newSoonArray);
			newSoon=true;
		
		}



		
 	}
 combinedAlert();
 function combinedAlert (){

 	//newNow = false;
 	//newSoon = false;

 	if (newNow === true && newSoon === true) {
var newNowString = newNowArray.join(', ');
 	var newSoonString = newSoonArray.join(', ');
 	$( "#warnings" ).empty();
 	$("#warnings").append("<div><p><span class='glyphicon glyphicon-fire'></span>!!!Maintenance due now on " + newNowString + ", and maintenance due soon on " + newSoonString + "!!!<span class='glyphicon glyphicon-fire'></span></p></div>");
 	$( "#hideWarnings" ).show();
 	$( "#warnings" ).removeClass( "warningSoon" );
 	$( "#warnings" ).addClass( "warningUrgent" );
 	return;

 }
 	if (newSoon === true) {
//var newNowString = newNowArray.join(', ');
 	var newSoonString = newSoonArray.join(', ');
 	$( "#warnings" ).empty();
 	$("#warnings").append("<div></span><p><span class='glyphicon glyphicon-flash'></span>!!!Maintenance due soon on " + newSoonString + "!!!<span class='glyphicon glyphicon-flash'></span></p></div>");
 	$( "#hideWarnings" ).show();
	$( "#warnings" ).removeClass( "warningUrgent" );
 	$( "#warnings" ).addClass( "warningSoon" );
    return;
 }

 if (newNow === true) {
var newNowString = newNowArray.join(', ');
 	//var newSoonString = newSoonArray.join(', ');
 	$( "#warnings" ).empty();
 	$("#warnings").append("<div><p><span class='glyphicon glyphicon-fire'></span>!!!Maintenance due now on " + newNowString + "!!!<span class='glyphicon glyphicon-fire'></span></p></div>");
 	$( "#hideWarnings" ).show();
	$( "#warnings" ).removeClass( "warningSoon" );
 	$( "#warnings" ).addClass( "warningUrgent" );
 	return;
 }

 else {
 		newNow = false;
 	newSoon = false;
 }

 
 }	
}

function captureData(index, projection){
	  var input = prompt("Enter Hours", projection);
	  if(input !=null){
	  	insertProjection(input, index);
	  }
}

function displayComponentInformationModal(id, name, hours, projection){
	
	$("#modifyModalComponent").val(name);
	$("#modifyModalHours").val(hours);
	$("#modifyModalProjection").val(projection);
	$("#saveChange").data("component",id);
}

function insertComponent(id, rename, hours, projection){
	var index = model.getComponentIndex(id);
	
	model.data.machines[model.selectedMachine].components[index].component = rename;
	model.data.machines[model.selectedMachine].components[index].hours = hours;
	model.data.machines[model.selectedMachine].components[index].projection = projection;
	
	updateUi();
	checkLifeCycle();
}
function killIt(index){
	 	model.data.machines[model.selectedMachine].components.splice(index,1);
		updateUi();
}

function updateUi(){
		nuke();
		initialize();
		updateOutput();	
		updateMachineListOutput();	
}

