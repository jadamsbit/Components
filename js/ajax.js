var model = json.parse("");

$(document).ready(function {
	// setup button handlers

	var scriptURL = "http://localhost:8888/scripts/components.php";

	$("#loadButton").click(function {
		// call the php script
		var jqxhr = $.ajax( {
			method: "POST",
  			url: scriptURL,
  			action: "load",
  			data: {} 
  		})
		  .done(function(data) {
		    updateModel(data);
		  })
		  .fail(function() {
		    alert( "error loading" );
		  })
		  .always(function() {
		  });
	});

	$("#saveButton").click(function {
		// call the php script
		var jqxhr = $.ajax( 
			method: "POST",
  			url: scriptURL,
  			action: "save",
  			data: {
  				components: urlencode(model.toString())
  			}
  		})
		  .done(function(data) {
		    alert( "success" );
		    updateModel(data);
		  })
		  .fail(function() {
		    alert( "error saving" );
		  })
		  .always(function() {
		  });
	});

	$("#resetButton").click(function {
		// call the php script
		var jqxhr = $.ajax( 
			method: "POST",
  			url: scriptURL,
  			action: "reset",
  			data: {}
  		})
		  .done(function(data) {
		    alert( "success" );
		    updateModel(data);
		  })
		  .fail(function() {
		    alert( "error reseting" );
		  })
		  .always(function() {
		  });
	});
});

function updateModel(data){
	model = json.parse(data);
}