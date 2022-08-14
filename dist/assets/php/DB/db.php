<?php
$server = 'localhost';
$user = 'root';
$password = '';
$db = 'Japan';

$connect = mysqli_connect($server, $user, $password, $db);

if (!$connect) {
    die("Can't connect to Data Base");
    exit;
}