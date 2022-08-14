<?php
require_once('../Delivery/NovaPoshtaApi2.php');
require_once('../Delivery/NovaPoshtaApi2Areas.php');

$np = new \LisDev\Delivery\NovaPoshtaApi2(
    'a45369ca1249fd87b7d80213c7ad59da',
    'ru', // Язык возвращаемых данных: ru (default) | ua | en
    FALSE, // При ошибке в запросе выбрасывать Exception: FALSE (default) | TRUE
    'curl' // Используемый механизм запроса: curl (defalut) | file_get_content
);
$cities = $np->getCities();
$cityRU = [];
$ref = [];
$city = [];
    foreach ($cities['data'] as $c) {
        array_push($city, $c['Description']);
        array_push($cityRU, $c['DescriptionRu']);
        array_push($ref, $c['Ref']);
    }
echo json_encode(array(
                     "ua" => $city,
                     "ru" => $cityRU,
                     "ref" => $ref,
                 ), TRUE);