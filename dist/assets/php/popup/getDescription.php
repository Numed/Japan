<?php
   $db = new PDO('mysql:dbname=japan; host=localhost', 'root', '');;
   $title = $_POST['desc'];
   $select = $db->prepare("SELECT `description` FROM `cards` WHERE title='$title';");
   $select->execute();
   $desc = $select->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode($desc);
?>