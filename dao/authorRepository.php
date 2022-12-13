<?php


require_once('connect.php');


$ALL_AUTHORS_SQL = 'SELECT * FROM AUTHORS';
$AUTHOR_BY_ID_SQL = "SELECT * FROM AUTHORS WHERE ID = ?";
$EDIT_AUTHOR_SQL = " UPDATE AUTHORS SET FIRST_NAME = ? ,LAST_NAME = ? ,PATRONYMIC = ? WHERE ID = ? ";
$DELETE_AUTHOR_SQL = "DELETE FROM AUTHORS WHERE ID = ? ";
$CREATE_AUTHOR_SQL = "INSERT INTO AUTHORS (FIRST_NAME, LAST_NAME , PATRONYMIC )  
                    VALUES (?, ?, ?)";


function getAllAuthorsBD()
{
    global $connect;
    global $ALL_AUTHORS_SQL;
    $authorsArray = [];
    if ($result = $connect->query($ALL_AUTHORS_SQL)) {
        foreach ($result as $row) {
            $authorItem = array();
            $authorItem ['id'] = $row["ID"];
            $authorItem ['firstName'] = $row["FIRST_NAME"];
            $authorItem ['lastName'] = $row["LAST_NAME"];
            $authorItem ['patronymic'] = $row["PATRONYMIC"];
            $authorsArray[] = $authorItem;
        }
    }
    return $authorsArray;
}

function getAuthorWithIdBD($id)
{
    global $connect;
    global $AUTHOR_BY_ID_SQL;

    $authorItem = array();

    $stmt = $connect->prepare($AUTHOR_BY_ID_SQL);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($result = $stmt->get_result()->fetch_assoc()) {
        $authorItem ['id'] = $result["ID"];
        $authorItem ['firstName'] = $result["FIRST_NAME"];
        $authorItem ['lastName'] = $result["LAST_NAME"];
        $authorItem ['patronymic'] = $result["PATRONYMIC"];
    }
    return $authorItem;
}

function createAuthorBD($author)
{
    global $CREATE_AUTHOR_SQL;
    global $connect;

    $stmt = $connect->prepare($CREATE_AUTHOR_SQL);
    $stmt->bind_param('sss', $author['FIRST_NAME'], $author['LAST_NAME'], $author['PATRONYMIC']);
    $stmt->execute();

//    printf("%d row inserted.\n", $stmt->affected_rows);
}

function updateAuthorBD($author)
{
    global $EDIT_AUTHOR_SQL;
    global $connect;

    $stmt = $connect->prepare($EDIT_AUTHOR_SQL);

    $stmt->bind_param('sssi',
        $author['FIRST_NAME'],
        $author['LAST_NAME'],
        $author['PATRONYMIC'],
        $author['ID']
    );
    $stmt->execute();

//    printf("%d row inserted.\n", $stmt->affected_rows);
}