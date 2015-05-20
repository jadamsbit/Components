$( document ).ready(function() {
		  /*===== this will hide the fields for the add features area. =====*/
	$('#showHideMachine').hide();

	$("#addMachine").click(function(evt) {
		var newMachId = $("#newMach").val();
		var newYMM = $("#newYMM").val();
		var newISD = $("#newISD").val();
		var newIndex = model.data.machines.length + 1;
		model.data.machines.push({"id": newIndex ,"machine":newMachId, "ymm":newYMM, "isd":newISD,"components":[]});
		model.selectedMachine = model.getSelectedItem(newIndex);
		nuke();
		updateMachineListOutput();
		updateMachineDetails();
		initialize();
		$('#showHideMachine').hide();
		$("#showMachineForm").show();
		$( "#hideWarnings" ).hide();
		$("#warnings").empty();

	})
});

function updateMachineListOutput(){
	for(var i=0; i < model.data.machines.length; i++){
		//output a line item for each json object found
		var currentMachine = model.data.machines[i];
		$("#machineSelector").find("#selectMachine-"+currentMachine.id).remove().end().append('<li class="selectMachine" data-machine="'+currentMachine.id+'" id="selectMachine-'+currentMachine.id+'">'+currentMachine.machine+'</li>');
		updateMachineDetails();
		$("#selectMachine-"+currentMachine.id).click(function(evt){
   			var myID = $(this).data("machine");
   			//console.log(myID);
   			model.selectedMachine = model.getSelectedItem(myID);
   			nuke();
   			updateMachineListOutput();
   			updateMachineDetails();
   			initialize();
   			checkLifeCycle();
 		});
		
	}
	
}
	
//call the function for the click handler when select on newly added machine.
function generateNewMachineDiv (id,name,newYMM,newISD){
	$("div #eqNum").empty().append(name + "<button type='button' class='btn btn-info btn-xs' id='newMachName' data-toggle = 'modal' data-target= '.bs-example-modal-sm'>edit</button>");
	$("div #eqInfo").empty().append(newYMM);
	$("div #eqISD").empty().append(newISD);
	$("#enterNew").data("machine", id);
	$("#newMachEdit").val(name);
	$("#newYMMEdit").val(newYMM);
	$("#newISDEdit").val(newISD);

		/*===== this will hide the edit button while the div is empty. =====*/
		
	if(name ==""){
		$("#newMachName").hide();
	}
	else{
		$("#newMachName").show();
	}
	$("#enterNew").click(function() {
		var id = $(this).data("machine");
		console.log(id);
		changeMachName(id);
		
	});
}

	/*===== this is the function that will open a prompt so that you can enter the new name and push it to the JSON. =====*/

function changeMachName(id){
	/* this sets up the model*/
	var machName = $("#newMachEdit").val();
	var newYMM = $("#newYMMEdit").val();
	var newISD = $("#newISDEdit").val();
	var newIndex = model.getSelectedItem(id);
	

		/*===== this is going to prompt the user to enter the new name of the machine. =====*/
	
	//var changeIt = model.data.machines.machine;
	
		/*===== this is where the new name will be added to the JSON. =====*/
	model.data.machines[newIndex].machine = machName;
	model.data.machines[newIndex].ymm = newYMM;
	model.data.machines[newIndex].isd = newISD;
	//console.log(model.data.machines[newIndex]);
		/*===== this calls the functions to change the div and the list. =====*/
	updateMachineDetails();
	updateMachineListOutput();
};

function updateMachineDetails (){
	generateNewMachineDiv("","","","");
	for(var i=0; i < model.data.machines.length; i++){
		if(model.selectedMachine == i){
			var currentMachine = model.data.machines[i];
			generateNewMachineDiv(currentMachine.id, currentMachine.machine, currentMachine.ymm, currentMachine.isd);
		}

	}

}














