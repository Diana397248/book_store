<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/dao/repository.php");

function getAllGenresApi(): string
{
    return json_encode(getAllGenresBD());
}

function createGenre()
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        //получение данных с формы
        $genre = $_POST['genre'];

//        echo json_encode($_POST);

        //проверка что все поля заполнены
        if (empty($genre)) {
            //не правильно заполненная сущность
            http_response_code(422);
            return;
        }


        //Создаем объект с нужными полями для БД
        $genreItem = array();
        $genreItem['GENRE'] = $genre;


        //для тестирования что находится в $genreItem
//        echo json_encode($genreItem);
//        return;

        //Передача в репозиторий чтоб сохрянить данные в бд
        createGenreBD($genreItem);


        //статус код успешный
        http_response_code(200);
        return json_encode(array(
            "message" => "Ok"
        ));
    }

    http_response_code(404);
}

function updateGenre()
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //получение данных с формы
        $id = $_POST['id'];
        $genre = $_POST['genre'];


        //проверка что все поля заполнены
        if (empty($id)
            or empty($genre)) {
            //не правильно заполненная сущность
            http_response_code(422);
            return;
        }


        //Создаем объект с нужными полями для БД
        $genreItem = array();

        $genreItem['ID'] = $id;
        $genreItem['GENRE'] = $genre;


        //для тестирования что находится в $authorItem
//        echo json_encode($genreItem);
//        return;

        //Передача в репозиторий чтоб сохрянить данные в бд
        updateGenreBD($genreItem);


        //статус код успешный
        http_response_code(200);
        return json_encode(array(
            "message" => "Ok"
        ));
    }

    http_response_code(404);
}

