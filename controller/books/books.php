<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/dao/repository.php");

function getAllBooksApi(): string
{
    return json_encode(getAllBooksBD());
}

function createBook()
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //чтение json объекта и преобразование в json
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        //TODO authors
        //получение данных с json
        $idGenre = $data->idGenre;
        $pathImg = $data->pathImg;
        $title = $data->title;
        $yearOfIssue = $data->yearOfIssue;
        $summary = $data->summary;

        //проверка что все поля заполнены
        if (empty($idGenre)
            or empty($pathImg)
            or empty($title)
            or empty($yearOfIssue)
            or empty($summary)) {
            //не правильно заполненная сущность
            http_response_code(422);
            return;
        }


        //Создаем объект с нужными полями для БД
        $bookItem = array();
        $bookItem['ID_GENRE'] = $idGenre;
        $bookItem['TITLE'] = $title;
        $bookItem['PATH_IMG'] = $pathImg;
        $bookItem['YEAR_OF_ISSUE'] = $yearOfIssue;
        $bookItem['SUMMARY'] = $summary;


        //для тестирования что находится в $bookItem
//        echo json_encode($bookItem);
//        return;

        //Передача в репозиторий чтоб сохрянить данные в бд
        createBookBD($bookItem);


        //статус код успешный
        http_response_code(200);
        return json_encode(array(
            "message" => "Ok"
        ));
    }

    http_response_code(404);
    return;

}