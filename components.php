<?php

 header('Access-Control-Allow-Origin: *');

 /*
$test = "hello world";
*/
/*
echo "<pre>" . print_r($_SERVER, 1) . "</pre>";

*/
//if (is_ajax()) {
  if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "load": get_function(); break;
      case "save": set_function ($_POST["data"]); break;
      case "reset": reset_data(); break;
    }
  }
//}

function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function get_function(){
	$return = $_POST;
	$file = 'components.txt';
	$current = file_get_contents($file);
	$return["json"] = json_encode($current);
	echo json_encode($return);
}

function set_function($data){
	$return = $_POST;
	$file = 'components.txt';
	$current = file_get_contents($file);
	file_put_contents($file, $data);
	$now = file_get_contents($file);
	$return["json"] = json_encode($now);
	echo json_encode($return);
}

function reset_data(){
	$master = 'components_master.txt';
	$file = 'components.txt';
	$current = file_get_contents($master);
	file_put_contents($file, $current);
	$return["json"] = json_encode("{'status':'reset'}");
	echo json_encode($return);
}
?>