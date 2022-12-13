<?php


require_once('connect.php');


$ALL_BOOKS_SQL = 'SELECT b.*,g.genre GENRE  FROM BOOKS as b  JOIN GENRES as g ON g.id=b.ID_GENRE;';
$BOOK_BY_ID_SQL = "SELECT * FROM BOOKS WHERE ID = ?";
$EDIT_BOOK_SQL = " UPDATE BOOKS SET ID_GENRE = ?, TITLE = ?, PATH_IMG = ?, YEAR_OF_ISSUE = ?, SUMMARY = ? WHERE ID = ? ";
$DELETE_BOOK_SQL = "DELETE FROM BOOKS WHERE ID = ?  ";
$CREATE_BOOK_SQL = "INSERT INTO BOOKS (ID_GENRE, TITLE , PATH_IMG , YEAR_OF_ISSUE , SUMMARY)  
                    VALUES (?, ?, ?, ?, ?)";




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
            $bookItem['genre'] = $row["GENRE"];
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
function updateBookBD($book)
{
    global $EDIT_AUTHOR_SQL;
    global $connect;

    $stmt = $connect->prepare($EDIT_AUTHOR_SQL);
    $stmt->bind_param('sssi',
        $book['FIRST_NAME'],
        $book['LAST_NAME'],
        $book['PATRONYMIC'],
        $book['ID']
    );
    $stmt->execute();

//    printf("%d row inserted.\n", $stmt->affected_rows);
}


