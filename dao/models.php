<?php

class Author
{
    private $id;
    private $firstName;
    private $lastName;
    private $patronymic;

    /**
     * @param $id
     * @param $firstName
     * @param $lastName
     * @param $patronymic
     */
    public function __construct($id, $firstName, $lastName, $patronymic)
    {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->patronymic = $patronymic;
    }


    public function getId()
    {
        return $this->id;
    }


    public function setId($id)
    {
        $this->id = $id;
    }

     
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * @param mixed $firstName
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    /**
     * @return mixed
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @param mixed $lastName
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    /**
     * @return mixed
     */
    public function getPatronymic()
    {
        return $this->patronymic;
    }

    /**
     * @param mixed $patronymic
     */
    public function setPatronymic($patronymic)
    {
        $this->patronymic = $patronymic;
    }


}

class Book
{
    private $id;
    private $idGenre;
    private $pathImg;
    private $title;
    private $yearOfIssue;
    private $summary;

    /**
     * @param $id
     * @param $idGenre
     * @param $pathImg
     * @param $title
     * @param $yearOfIssue
     * @param $summary
     */
    public function __construct($id, $idGenre, $pathImg, $title, $yearOfIssue, $summary)
    {
        $this->id = $id;
        $this->idGenre = $idGenre;
        $this->pathImg = $pathImg;
        $this->title = $title;
        $this->yearOfIssue = $yearOfIssue;
        $this->summary = $summary;
    }

     
    public function getId()
    {
        return $this->id;
    }


    public function setId($id)
    {
        $this->id = $id;
    }


    public function getIdGenre()
    {
        return $this->idGenre;
    }


    public function setIdGenre($idGenre)
    {
        $this->idGenre = $idGenre;
    }


    public function getPathImg()
    {
        return $this->pathImg;
    }


    public function setPathImg($pathImg)
    {
        $this->pathImg = $pathImg;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getYearOfIssue()
    {
        return $this->yearOfIssue;
    }

    /**
     * @param mixed $yearOfIssue
     */
    public function setYearOfIssue($yearOfIssue)
    {
        $this->yearOfIssue = $yearOfIssue;
    }

    /**
     * @return mixed
     */
    public function getSummary()
    {
        return $this->summary;
    }

    /**
     * @param mixed $summary
     */
    public function setSummary($summary)
    {
        $this->summary = $summary;
    }


}

class Genre
{
    private $id;
    private $genre;

    /**
     * @param $id
     * @param $genre
     */
    public function __construct($id, $genre)
    {
        $this->id = $id;
        $this->genre = $genre;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getGenre()
    {
        return $this->genre;
    }

    /**
     * @param mixed $genre
     */
    public function setGenre($genre)
    {
        $this->genre = $genre;
    }


}


class BookAuthor
{
    private $idAuthor;
    private $idGenre;

    /**
     * @param $idAuthor
     * @param $idGenre
     */
    public function __construct($idAuthor, $idGenre)
    {
        $this->idAuthor = $idAuthor;
        $this->idGenre = $idGenre;
    }

    /**
     * @return mixed
     */
    public function getIdAuthor()
    {
        return $this->idAuthor;
    }

    /**
     * @param mixed $idAuthor
     */
    public function setIdAuthor($idAuthor)
    {
        $this->idAuthor = $idAuthor;
    }

    /**
     * @return mixed
     */
    public function getIdGenre()
    {
        return $this->idGenre;
    }

    /**
     * @param mixed $idGenre
     */
    public function setIdGenre($idGenre)
    {
        $this->idGenre = $idGenre;
    }


}

