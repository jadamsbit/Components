

var model = {};

model.data=JSON.parse ('{ "machines" : []}');


model.selectedMachine = null;


console.log(model);

$( document ).ready(function() {
		  /*===== this will hide the fields for the add features area. =====*/
		$('#showHideMachine').hide();
// assign new machine button a click handler
// when clicked add new container div to the page
// the container div will contain structure(html)for
// a new machine
	$("#showMachineForm").click(function(evt){
		$("#showMachineForm").hide();
		$('#showHideMachine').show();
		// hide button
		// unhide input field
	})

	$("#addMachine").click(function(evt) {
		
		var newMachId = $("#newMach").val();
		console.log(newMachId);
		var newYMM = $("#newYMM").val();
		console.log(newYMM);
		var newISD = $("#newISD").val();
		console.log(newISD);
		var newIndex = model.data.machines.length + 1;
		model.data.machines.push({"id": newIndex ,"machine":newMachId, "ymm":newYMM, "isd":newISD,"components":[]});
		updateMachineListOutput();
	})
// create a method to add a machine to the model

});



function updateMachineListOutput(){
			//loop through the json object
	
	for(var i=0; i < model.data.machines.length; i++){
			//output a line item for each json object found
		var currentMachine = model.data.machines[i];
		$("#machineSelector").find("#selectMachine-"+currentMachine.id).remove().end().append('<li class="selectMachine" data-machine="'+currentMachine.id+'" id="selectMachine-'+currentMachine.id+'">'+currentMachine.machine+'</li>');
	}
	
//call the function for the click handler when select on newly added machine.

$("#currentMachine").click(function(){
    "do this");
});

}

function 

//function to give the click handlers to the items in the drop down list.




//function for the click handlers and in that call the generateNewMachineDiv.

function generateNewMachineDiv (newIndex,newMachId,newYMM,newISD){
	
	$("div #eqNum") .replaceWith(+newMachId+);
	$("div #eqInfo") .replaceWith(+newYMM+, +newISD+);
	$("p") .remove(".comp, .hours, .proj");
	 


	//take parameters and create HTML for each line item
	//
}

// model.components[i].hours

// create a method to add a component to the machine
// create a method to select a machine
// model.selectedMachine = id?
// create a method to generate html for the machine
// invoke output of updated machine