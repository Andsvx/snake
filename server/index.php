<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	$arr = file_get_contents('results.json');
	echo $arr;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$results = file_get_contents('results.json');
	$arr = json_decode($results, true);

	$name = ($_POST['name'] == '') ? $_POST['name'] = '---' : $_POST['name'];
	$new_result = array('name' => htmlspecialchars($name), 'score' => $_POST['score']);
	$arr[] = $new_result;

	file_put_contents('results.json', json_encode($arr));
}

?>