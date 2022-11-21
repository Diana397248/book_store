<?php
$connect = new mysqli('localhost', 'root', '', 'praktika');
if ($connect->connect_error) {
    die("Error connect DB");
}