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
function generateNewMachineDiv (newIndex,newMachId,newYMM,newISD){
	 $("div #eqNum").empty().append(newMachId);
	 $("div #eqInfo").empty().append(newYMM);
	 $("div #eqISD").empty().append(newISD);	
}

function updateMachineDetails (){
	generateNewMachineDiv("","","","");
	for(var i=0; i < model.data.machines.length; i++){
		if(model.selectedMachine == i){
			var currentMachine = model.data.machines[i];
			generateNewMachineDiv(currentMachine.id, currentMachine.machine, currentMachine.ymm, currentMachine.isd);
		}
	}
}