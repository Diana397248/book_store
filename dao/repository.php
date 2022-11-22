<?php


require_once('connect.php');

$ALL_BOOKS_SQL = 'SELECT * FROM BOOKS';
$BOOK_BY_ID_SQL = "SELECT * FROM BOOKS WHERE ID = ?";
$EDIT_BOOK_SQL = " UPDATE BOOKS SET ID_GENRE = ?, TITLE = ?, PATH_IMG = ?, YEAR_OF_ISSUE = ?, SUMMARY = ? WHERE ID = ? ";
$DELETE_BOOK_SQL = "DELETE FROM BOOKS WHERE ID = ?  ";
$CREATE_BOOK_SQL = "INSERT INTO BOOKS (ID_GENRE, TITLE , PATH_IMG , YEAR_OF_ISSUE , SUMMARY)  
                    VALUES (?, ?, ?, ?, ?)";


$ALL_AUTHORS_SQL = 'SELECT * FROM AUTHORS';
$AUTHOR_BY_ID_SQL = "SELECT * FROM AUTHORS WHERE ID = ?";
$EDIT_AUTHOR_SQL = " UPDATE AUTHORS SET FIRST_NAME = ? ,LAST_NAME = ? ,PATRONYMIC = ? WHERE ID = ? ";
$DELETE_AUTHOR_SQL = "DELETE FROM AUTHORS WHERE ID = ? ";
$CREATE_AUTHOR_SQL = "INSERT INTO AUTHORS (FIRST_NAME, LAST_NAME , PATRONYMIC )  
                    VALUES (?, ?, ?)";


$ALL_GENRES_SQL = 'SELECT * FROM GENRES';
$GENRE_BY_ID_SQL = "SELECT * FROM GENRES WHERE ID = ?";
$EDIT_GENRE_SQL = " UPDATE GENRES SET GENRE = ? WHERE ID = ? ";
$DELETE_GENRE_SQL = "DELETE FROM GENRES WHERE ID = ?  ";
$CREATE_GENRE_SQL = "INSERT INTO GENRES (GENRE)  
                    VALUES (?)";

function getAllBooksBD()
{
    global $connect;
    global $ALL_BOOKS_SQL;
    $bookArray = [];
    if ($result = $connect->query($ALL_BOOKS_SQL)) {
        foreach ($result as $row) {
            $bookItem = array();
            $bookItem['id'] = $row["ID"];
            $bookItem['idGenre'] = $row["ID_GENRE"];
            $bookItem['pathImg'] = $row["PATH_IMG"];
            $bookItem['title'] = $row["TITLE"];
            $bookItem['yearOfIssue'] = $row["YEAR_OF_ISSUE"];
            $bookItem['summary'] = $row["SUMMARY"];
            $bookItem['authors'] = array();
            $bookArray[] = $bookItem;
        }
    }
    return $bookArray;
}

function getAllAutorsBD()
{
    global $connect;
    global $ALL_AUTHORS_SQL;
    $authorsArray = [];
    if ($result = $connect->query($ALL_AUTHORS_SQL)) {
        foreach ($result as $row) {
            $authorItem = new Author(
                $row["ID"],
                $row["FIRST_NAME"],
                $row["LAST_NAME"],
                $row["PATRONYMIC"]
            );
            $authorsArray[] = $authorItem;
        }
    }
    return $authorsArray;
}

function getAllGenresBD()
{
    global $connect;
    global $ALL_GENRES_SQL;
    $genresArray = [];
    if ($result = $connect->query($ALL_GENRES_SQL)) {
        foreach ($result as $row) {
            $genreItem = new Genre(
                $row["ID"],
                $row["GENRE"]
            );
            $genresArray[] = $genreItem;
        }
    }
    return $genresArray;
}

function createBookBD($book)
{
    global $CREATE_BOOK_SQL;
    global $connect;

    $stmt = $connect->prepare($CREATE_BOOK_SQL);
    $stmt->bind_param('issis', $book['ID_GENRE'], $book['TITLE'], $book['PATH_IMG'],
        $book['YEAR_OF_ISSUE'], $book['SUMMARY']);

    $stmt->execute();

//    printf("%d row inserted.\n", $stmt->affected_rows);
}














