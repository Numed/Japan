<?php

require_once "../DB/db.php";

$title = $_POST['title'];
$price = $_POST['price'];
$description = $_POST['description'];
$img = $_FILES['image']['tmp_name'];
$imgAlt = $_FILES['image']['name'];
$values = $_POST['values'];
$ratingValue = $_POST['rating'];
move_uploaded_file($img, "../../img/items/$imgAlt");
$readyDescription = $connect->real_escape_string($description);

$check = $connect->query("SELECT * FROM `cards` WHERE title='$title'");
if (mysqli_num_rows($check) == 0) {
    $insert = $connect->query("INSERT INTO `cards` (`title`, `price`, `description`, `img`, `imgAlt`, `selectValue`, `ratingValue`) 
    VALUES ('$title', '$price $', '$readyDescription', 'assets/img/dest/items/$imgAlt', '$imgAlt', '$values', '$ratingValue');");
}
$connect->close();

header("Location: ../../../admin.php");
?>