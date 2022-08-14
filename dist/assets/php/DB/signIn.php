<?php
session_start();
require_once 'db.php';

$login = $_POST['Login'];
$password = md5($_POST['Password']);

$check = $connect->query("SELECT * FROM `login` WHERE `login` = '$login' AND `password`='$password'");
if (mysqli_num_rows($check) > 0) {
    header('Location: ../../../admin.php');
} else {
    header('Location: ../../../login.php');
}
$connect->close();
