var model = {};
model.data=JSON.parse ('{}');
model.selectedMachine = null;

model.getSelectedItem = function (id){
	var selectedID = null;
	for(var i=0; i < model.data.machines.length; i++){
		if(model.data.machines[i].id == id){
			selectedID = i;
		}
	}
	return selectedID;
}