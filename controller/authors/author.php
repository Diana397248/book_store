<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/dao/repository.php");

function getAllAuthorsApi(): string
{
    return json_encode(getAllAuthorsBD());
}

function createAuthor()
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //TODO authors
        //получение данных с формы
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $patronymic = $_POST['patronymic'];

        //проверка что все поля заполнены
        if (empty($firstName)
            or empty($lastName)
            or empty($patronymic)) {
            //не правильно заполненная сущность
            http_response_code(422);
            return;
        }


        //Создаем объект с нужными полями для БД
        $authorItem = array();
        $authorItem['FIRST_NAME'] = $firstName;
        $authorItem['LAST_NAME'] = $lastName;
        $authorItem['PATRONYMIC'] = $patronymic;


        //для тестирования что находится в $authorItem
//        echo json_encode($authorItem);
//        return;

        //Передача в репозиторий чтоб сохрянить данные в бд
        createAuthorBD($authorItem);


        //статус код успешный
        http_response_code(200);
        return json_encode(array(
            "message" => "Ok"
        ));
    }

    http_response_code(404);
}

function updateAuthor(){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //получение данных с формы
        $id = $_POST['id'];
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $patronymic = $_POST['patronymic'];

        //проверка что все поля заполнены
        if (empty($firstName)
            or empty($id)
            or empty($lastName)
            or empty($patronymic)) {
            //не правильно заполненная сущность
            http_response_code(422);
            return;
        }


        //Создаем объект с нужными полями для БД
        $authorItem = array();

        $authorItem['ID'] = $id;
        $authorItem['FIRST_NAME'] = $firstName;
        $authorItem['LAST_NAME'] = $lastName;
        $authorItem['PATRONYMIC'] = $patronymic;


        //для тестирования что находится в $authorItem
//        echo json_encode($authorItem);
//        return;

        //Передача в репозиторий чтоб сохрянить данные в бд
        updateAuthorBD($authorItem);


        //статус код успешный
        http_response_code(200);
        return json_encode(array(
            "message" => "Ok"
        ));
    }

    http_response_code(404);
}

