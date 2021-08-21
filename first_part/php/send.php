<?php

$name = $_POST['name'];
$password = $_POST['password'];

$conn = mysql_connect("localhost", "root", "root");
mysql_select_db("testWork", $db);

if ($conn === false) {
	die("Ошибка: " . mysqli_connect_error());
}
echo "Подключение успешно установлено";
mysqli_close($conn);

?>