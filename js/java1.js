
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
			
		 var newYMM = $("#newYMM").val();
		
		 var newISD = $("#newISD").val();
		
		var newIndex = model.data.machines.length + 1;
		model.data.machines.push({"id": newIndex ,"machine":newMachId, "ymm":newYMM, "isd":newISD,"components":[]});
		updateMachineListOutput();
		$('#showHideMachine').hide();
		$("#showMachineForm").show();
		


	})
// create a method to add a machine to the model


});



function updateMachineListOutput(){
			//loop through the json object
	
	for(var i=0; i < model.data.machines.length; i++){
			//output a line item for each json object found
		var currentMachine = model.data.machines[i];
		$("#machineSelector").find("#selectMachine-"+currentMachine.id).remove().end().append('<li class="selectMachine" data-machine="'+currentMachine.id+'" id="selectMachine-'+currentMachine.id+'">'+currentMachine.machine+'</li>');
		generateNewMachineDiv(newIndex, newMachId, newYMM, newISD);
	
		$("#selectMachine-"+currentMachine.id).click(function(evt){
			alert("I work");
   			model.data=JSON.parse ("'{ 'machines' : " + [newIndex] + "}'");
 		});
		console.log("'{ 'machines' : " + [newIndex] + "}'");
	}
}
	

//call the function for the click handler when select on newly added machine.

 function generateNewMachineDiv (newIndex,newMachId,newYMM,newISD){
console.log(newMachId);
	 $("div #eqNum").empty().append(newMachId);
	 $("div #eqInfo").empty().append(newYMM);
	 $("div #eqISD").empty().append(newISD);
	
	 //$("div #eqInfo").replaceWith(+newYMM+, +newISD+);	

	
}




//$("currentMachine") 

//function to give the click handlers to the items in the drop down list.





//function for the click handlers and in that call the generateNewMachineDiv.



// model.components[i].hours

// create a method to add a component to the machine
// create a method to select a machine
// model.selectedMachine = id?
// create a method to generate html for the machine
// invoke output of updated machine





