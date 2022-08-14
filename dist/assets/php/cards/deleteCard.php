<?php
require_once "../DB/db.php";

$cardTitle = $_POST["cardTitle"];

$check = $connect->query("DELETE FROM `cards` WHERE title='$cardTitle'");
$connect->close();
?>