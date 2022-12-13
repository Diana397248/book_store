function Add(event) {
    // отправляем данные на сервер
    $.ajax({
        type: 'POST',
        url: '/controller/books/createBook.php',
        // устанавливаем что получаемый тип данных json
        dataType: 'json',
        data: $('#sample_form').serialize(),
        // при успешном выполнении выполянется функция
        success: function (data) {
            //скрываем модальное окошко
            $('#add_edit_modal').modal('hide');
            // обновляем и отрисовывваем все книжки с сервера
            getAllBook();
        },
        //если не успешно 404 401 403 400 422 (5ХХ 4ХХ)
        error: function (xhr, textStatus, error) {
            //чтоб получить и проверить статус код
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}

function EditModal(id) {
    $('#dynamic_modal_title').text('Редактировать книгу');

    $('#action').val('Изменить');

    let sendButton = $('#action_button');
    sendButton.off("click")
    sendButton.on('click', () => Edit(id));
    sendButton.text(`Редактировать`);
    //Cброс формы и всех ее значений инуптов
    $('#sample_form')[0].reset();
    // можно будет потом потом добавить выворлд ошибок валидации
    $('.text-danger').text('');

    fetch(`/controller/books/getBookWithId.php?id=${id}`)
        .then(res => res.json())
        .then(book => {
            let genresHtml = document.querySelector("#genres").querySelector(`option[value="${book.idGenre}"]`)
            genresHtml.selected = true;

            $('#title').val(book.title);
            $('#path_img').val(book.pathImg);
            $('#year_of_issue').val(book.yearOfIssue);
            $('#summary').val(book.summary);

            $('#add_edit_modal').modal('show');

        })

}

function Edit(id) {
    console.log('edit')
    console.log(id)
    let path_img = $('#path_img').val();
    let year_of_issue = $('#year_of_issue').val();
    let summary = $('#summary').val();
    let title = $('#title').val();
    let genre = $('#genres').val();

    let form = new FormData()

    let request_data = {
        "id": id,
        "idGenre": genre,
        "pathImg": path_img,
        "title": title,
        "yearOfIssue": year_of_issue,
        "summary": summary,
        "authors": []
    }
    console.log(request_data)
    for (let key in request_data) {
        console.log(`key ${key} value ${request_data[key]}`)
        form.append(key, request_data[key]);
    }


    // отправляем данные на сервер
    fetch("/controller/books/updateBook.php",
        {
            body: form,
            method: "POST"
        })
        .then(res => res.json())
        .then(data => {
            $('#add_edit_modal').modal('hide');
            // обновляем и отрисовывваем все книжки с сервера
            getAllBook();
        })
        .catch(err => console.log(err));
}

function Delete(id) {
    console.log("Delete " + id)
}

function getAllBook() {
    $.ajax({
        url: '/controller/books/getAll.php',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            let $booksHtml = $("#books");
            $booksHtml.empty()

            for (let i = 0; i < data.length; i++) {
                let book = data[i]
                let row = $("<tr></tr>");

                let id = $('<th  scope="row"></th>');
                let name = $("<td></td>");
                let authors = $("<td></td>");
                let genre = $("<td></td>");
                let pathImg = $("<td></td>");
                let yearOfIssue = $("<td></td>");
                let summary = $("<td></td>");
                let actions = $("<td></td>");

                let action_edit = $("<button type='button' class='btn btn-info mr-1'>Редактировать</button>");
                let action_delete = $("<button type='button' class='btn btn-danger'>Удалить</button>");

                action_edit.on("click", () => EditModal(book.id))
                action_delete.on("click", () => Delete(book.id))
                actions.append(action_edit);
                actions.append(action_delete);

                id.text(book.id);
                name.text(book.title);
                genre.text(book.genre);
                authors.text(book.authors.join(", "));
                pathImg.text(book.pathImg);
                yearOfIssue.text(book.yearOfIssue);
                summary.text(book.summary);


                row.append(id);
                row.append(name);
                row.append(genre);
                row.append(authors);
                row.append(pathImg);
                row.append(yearOfIssue);
                row.append(summary);
                row.append(actions);

                $booksHtml.append(row)

                // console.log(data[i])

            }
        }
    });

}


$(document).ready(function () {

    getAllBook();
    $(function () {
        $('#footer').load('/view/global/footer/footer.html')
        $('#edit_add').load('/view/book/add_edit_book.html')
    });

    $('#add_data').click(function () {

        $('#dynamic_modal_title').text('Добавить книгу');

        $('#sample_form')[0].reset();

        $('#action').val('Добавить');

        let sendButton = $('#action_button');
        sendButton.off("click")
        sendButton.on('click', Add);
        sendButton.text('Добавить');

        $('.text-danger').text('');

        $('#add_edit_modal').modal('show');

    });
})
