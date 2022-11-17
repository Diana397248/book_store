<?php
require_once($_SERVER['DOCUMENT_ROOT'] ."/dao/repository.php");
require_once($_SERVER['DOCUMENT_ROOT'] . "/dto/models_dto.php");

function getAllBooksApi(){
    echo json_encode(BookDto::mapToDtoArray(geAllBooksBD()));
}