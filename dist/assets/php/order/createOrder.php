<?php


require_once "../DB/db.php";

$firstName = $_POST['firstName'].' '. $_POST['secondName'];
$phone = $_POST['phone'];
$city = $_POST['city']. ', '. $_POST['select'];
$payment = $_POST['radio__btn'];
$items = $_POST['items'];
$total = $_POST['total'];

$insert = $connect->query("INSERT INTO orders ( Customer, Phone, Items, Delivery, Payment, TotalPrice)
VALUES ( '$firstName', '$phone', '$items', '$city', '$payment', '$total');");
$connect->close();

header ('Location:  ../../../products.php');
?>