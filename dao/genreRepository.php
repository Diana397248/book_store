<?php


require_once('connect.php');


$ALL_GENRES_SQL = 'SELECT * FROM GENRES';
$GENRE_BY_ID_SQL = "SELECT * FROM GENRES WHERE ID = ?";
$EDIT_GENRE_SQL = " UPDATE GENRES SET GENRE = ? WHERE ID = ? ";
$DELETE_GENRE_SQL = "DELETE FROM GENRES WHERE ID = ? ";
$CREATE_GENRE_SQL = "INSERT INTO GENRES (GENRE)  
                    VALUES (?)";


function getAllGenresBD()
{
    global $connect;
    global $ALL_GENRES_SQL;
    $genresArray = [];
    if ($result = $connect->query($ALL_GENRES_SQL)) {
        foreach ($result as $row) {
            $genreItem = array();
            $genreItem ['id'] = $row["ID"];
            $genreItem ['genre'] = $row["GENRE"];
            $genresArray[] = $genreItem;
        }
    }
    return $genresArray;
}

function createGenreBD($genre)
{
    global $CREATE_GENRE_SQL;
    global $connect;

    $stmt = $connect->prepare($CREATE_GENRE_SQL);
    $stmt->bind_param('s', $genre['GENRE']);
    $stmt->execute();

//    printf("%d row inserted.\n", $stmt->affected_rows);
}

function updateGenreBD($genre)
{
    global $EDIT_GENRE_SQL;
    global $connect;

    $stmt = $connect->prepare($EDIT_GENRE_SQL);
    $stmt->bind_param('si', $genre['GENRE'], $genre['ID']);
    $stmt->execute();

//    printf("%d row inserted.\n", $stmt->affected_rows);
}


function getGenreWithIdBD($id)
{
    global $connect;
    global $GENRE_BY_ID_SQL;

    $genreItem = array();

    $stmt = $connect->prepare($GENRE_BY_ID_SQL);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($result = $stmt->get_result()->fetch_assoc()) {
        $genreItem ['id'] = $result["ID"];
        $genreItem ['genre'] = $result["GENRE"];
    }
    return $genreItem;
}