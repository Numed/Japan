<?php
   $db = new PDO('mysql:dbname=japan; host=localhost', 'root', '');;
   $title = $_POST['popup'];
   $select = $db->prepare("SELECT `selectValue` FROM `cards` WHERE title='$title';");
   $select->execute();
   $orders = $select->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode($orders);
?>