<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/dao/bookRepository.php");

function getAllBooksApi()
{
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $search = $_GET['search'];
        $genreSort = $_GET['genre_sort'];
        return json_encode(getAllBooksBD($search, $genreSort));
    }
}

function uploadImage($image)
{
    $name = $image['name'];
    $tmp_name = $image ['tmp_name'];
    $filename = '../../resources/uploads/' . $name;
    $filenameForBd = '/resources/uploads/' . $name;
    move_uploaded_file($tmp_name, $filename);
    return $filenameForBd;
}

function createBook()
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //TODO authors
        //получение данных с формы
        $idGenre = $_POST['idGenre'];

        $title = $_POST['title'];
        $yearOfIssue = $_POST['yearOfIssue'];
        $summary = $_POST['summary'];
        //проверка что все поля заполнены
        if (empty($idGenre)
            or is_null($_FILES['file'])
            or empty($title)
            or empty($yearOfIssue)
            or empty($summary)) {
            //не правильно заполненная сущность
            http_response_code(422);
            return;
        }
        $pathImg = uploadImage($_FILES['file']);
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
}

function updateBook()
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //получение данных с формы
        $id = $_POST['id'];
        $idGenre = $_POST['idGenre'];
        $title = $_POST['title'];
        $yearOfIssue = $_POST['yearOfIssue'];
        $summary = $_POST['summary'];;

        //проверка что все поля заполнены
        if (
            empty($id)
            or empty($idGenre)
            or empty($title)
            or empty($yearOfIssue)
            or empty($summary)) {
            //не правильно заполненная сущность
            http_response_code(422);
            return;
        }
        $pathImg = '';
        if (!is_null($_FILES['file'])) {
            $pathImg = uploadImage($_FILES['file']);
        }

        //Создаем объект с нужными полями для БД
        $bookItem = array();

        $bookItem['ID'] = $id;
        $bookItem['ID_GENRE'] = $idGenre;
        $bookItem['TITLE'] = $title;
        $bookItem['PATH_IMG'] = $pathImg;
        $bookItem['YEAR_OF_ISSUE'] = $yearOfIssue;
        $bookItem['SUMMARY'] = $summary;


        //для тестирования что находится в $authorItem
//        echo json_encode($authorItem);
//        return;

        //Передача в репозиторий чтоб сохрянить данные в бд
        updateBookBD($bookItem);


        //статус код успешный
        http_response_code(200);
        return json_encode(array(
            "message" => "Ok"
        ));
    }

    http_response_code(404);
}


function getBookWithId()
{
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        //получение данных с формы
        $id = $_GET['id'];


        //проверка что все поля заполнены
        if (empty($id)) {
            //не правильно заполненная сущность
            http_response_code(422);
            return;
        }
        return json_encode(getBookWithIdBD($id));
    }

}
