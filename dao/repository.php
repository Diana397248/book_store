<?php


require_once('models.php');
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

function geAllBooksBD()
{
    global $connect;
    global $ALL_BOOKS_SQL;
    $bookArray = [];
    if ($result = $connect->query($ALL_BOOKS_SQL)) {
        foreach ($result as $row) {
            $bookItem = new Book(
                $row["ID"],
                $row["ID_GENRE"],
                $row["TITLE"],
                $row["PATH_IMG"],
                $row["YEAR_OF_ISSUE"],
                $row["SUMMARY"]);
            $bookArray[] = $bookItem;
        }
    }
    return $bookArray;
}
















