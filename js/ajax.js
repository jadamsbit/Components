var model = {};
model.data = JSON.parse("{}");

model.updateModel = function (data){
	model.data  = JSON.parse(data);
	console.log(model);
}

console.log(model);

$( document ).ready(function (){
	// setup button handlers

	var scriptURL = "http://localhost:8888/components.php";
	
	$("#loadButton").click(function (){
		// call the php script
		var data = {
		      "action": "load"
		  };
		data = $(this).serialize() + "&" + $.param(data);
		$.ajax( {
			method: "POST",
  			url: scriptURL,
  			dataType:"json",
  			data:data,
  			success: function (data){
  				model.updateModel(data["json"]);
  			}
  		});
	});

	$("#saveButton").click(function (){
		// call the php script
		var data = {
		      "action": "save",
		      "data" : model.data
		  };
		data = $(this).serialize() + "&" + $.param(data);
		$.ajax( {
			method: "POST",
  			url: scriptURL,
  			dataType:"json",
  			data:data,
  			success: function (data){
  				model.updateModel(data["json"]);
  			}
  		});
	});

	$("#resetButton").click(function () {
		// call the php script
		var data = {
		      "action": "reset"
		  };
		data = $(this).serialize() + "&" + $.param(data);
		$.ajax( {
			method: "POST",
  			url: scriptURL,
  			dataType:"json",
  			data:data,
  			success: function (data){
  				model.updateModel(data["json"]);
  			}
  		});
	});

});
