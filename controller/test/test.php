<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $q = $_GET['q'];
    echo  empty($q);
}