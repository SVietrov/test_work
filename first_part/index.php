<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

$name = trim($_POST['name']);
$password = trim($_POST['password']);
$email = trim($_POST['email']);

$conn = mysqli_connect("localhost", "root", "root", "testWork");

if ($conn === false) {
    die("Ошибка: " . mysqli_connect_error());
}

// $sql = "SELECT * FROM `users` WHERE `name` = '$name' || `email` = '$email'";

$sql = 'INSERT INTO `users` (`name`, `password`, `email`) VALUES ("' . $name .'", "' . $password .'", "' . $email .'")';
if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
mysqli_close($conn);
