<?php
require_once($_SERVER['DOCUMENT_ROOT'] .'/dao/models.php');

class AuthorDto
{
    private $id;
    private $firstName;
    private $lastName;
    private $patronymic;



}

class BookDto
{
    public $id;
    public $idGenre;
    public $pathImg;
    public $title;
    public $yearOfIssue;
    public $summary;
    public $authors;

    public function __construct($id, $idGenre, $pathImg, $title, $yearOfIssue, $summary, $authors)
    {
        $this->id = $id;
        $this->idGenre = $idGenre;
        $this->pathImg = $pathImg;
        $this->title = $title;
        $this->yearOfIssue = $yearOfIssue;
        $this->summary = $summary;
        $this->authors = $authors;
    }

    public static function mapToDto(Book $book)
    {
        return new BookDto(
            $book->getId(),
            $book->getIdGenre(),
            $book->getPathImg(),
            $book->getTitle(),
            $book->getYearOfIssue(),
            $book->getSummary(),
            array()
        );
    }

    public static function mapToDtoArray($array)
    {
        $result = array();
        foreach ($array as $item) {
            $result[] = BookDto::mapToDto($item);
        }
        return $result;
    }

}

class GenreDto
{
    private $id;
    private $genre;



}


class BookAuthorDto
{
    private $idAuthor;
    private $idGenre;




}
