<?php

require_once "../DB/db.php";

$customer =  $_POST['Customer'];
$delete = $connect->query("DELETE FROM `orders` WHERE Customer = '$customer'");

$connect->close();
?>