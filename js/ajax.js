

model.scriptURL = "http://localhost:8888/components.php";

model.updateModel = function (data){
	model.data  = JSON.parse(data);
	model.data = JSON.parse(model.data);
	nuke();
	initialize();
}

model.getData = function (data){
	var data = {
	      "action": "load"
	  };
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax( {
		method: "POST",
		url: model.scriptURL,
		dataType:"json",
		data:data,
		success: function (data){
			model.updateModel(data["json"]);
		}
	});
}

model.saveData = function (data){
	console.log(JSON.stringify(model.data));
	var data = {
	      "action": "save",
	      "data" : JSON.stringify(model.data)
	  };
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax( {
		method: "POST",
		url: model.scriptURL,
		dataType:"json",
		data:data,
		success: function (data){
			model.updateModel(data["json"]);
		}
	});
}

model.resetData = function(){
	var data = {
	      "action": "reset"
	  };
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax( {
		method: "POST",
		url: model.scriptURL,
		dataType:"json",
		data:data,
		success: function (data){
			model.updateModel(data["json"]);
		}
	});
}
//console.log(model);

$( document ).ready(function (){
	// setup button handlers
	
	$("#loadButton").click(function (){
		// call the php script
		model.getData();
	});

	$("#saveButton").click(function (){
		// call the php script
		model.saveData();
	});

	$("#resetButton").click(function () {
		// call the php script
		model.resetData();
	});

	model.getData();

});
