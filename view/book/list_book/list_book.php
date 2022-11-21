<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
            integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/view/global/global.css">

    <title>Document</title>
</head>
<body>
<h2 class="title_center">Книги</h2>
<button type="button" class="btn btn-success" id="add_data">Добавить</button>
<table class="table caption-top">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Название</th>
        <th scope="col">Авторы</th>
        <th scope="col">Обложка</th>
        <th scope="col">Год выпуска</th>
        <th scope="col">Описание</th>
    </tr>
    </thead>
    <tbody id="books">

    </tbody>
</table>

<div id="footer"></div>
<div id="edit_add"></div>

<script src="/view/book/list_book/list_book.js"></script>
</body>
</html>