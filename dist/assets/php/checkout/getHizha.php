<?php
require_once('../Delivery/NovaPoshtaApi2.php');
require_once('../Delivery/NovaPoshtaApi2Areas.php');

$np = new \LisDev\Delivery\NovaPoshtaApi2(
    'a45369ca1249fd87b7d80213c7ad59da',
    'ru', // Язык возвращаемых данных: ru (default) | ua | en
    FALSE, // При ошибке в запросе выбрасывать Exception: FALSE (default) | TRUE
    'curl' // Используемый механизм запроса: curl (defalut) | file_get_content
);
$wh = $np->getWarehouses($_POST['warehouses']);
$ware = [];
foreach ($wh['data'] as $warehouse) {
    array_push($ware, $warehouse['Description']);
}
echo json_encode($ware, TRUE);