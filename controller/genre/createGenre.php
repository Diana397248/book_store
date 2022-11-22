<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/controller/genre/genre.php');

header('Content-Type: application/json');

http_response_code(200);

echo createGenre();
