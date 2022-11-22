function Add(event) {
    //получаем все данные (значения) из формы ( инпутов)
    let book_name = $('#title').val();
    let genre = $('#genre').val();
    let path_img = $('#path_img').val();
    let year_of_issue = $('#year_of_issue').val();
    let summary = $('#summary').val();

    // формируем json
    let request_data = {
        'title': book_name,
        'idGenre': genre,
        'pathImg': path_img,
        'yearOfIssue': year_of_issue,
        'summary': summary,
    }

    // для дебага
    // console.log(request_data)


    // отправляем данные на сервер
    $.ajax({
        type: 'POST',
        url: 'http://aboba/controller/books/createBook.php',
        // устанавливаем что получаемый тип данных json
        dataType: 'json',
        // отправляем тип данных json
        contentType: 'application/json',
        // не забываем переделать в json строку через JSON.stringify
        data: JSON.stringify(request_data),
        // при успешном выполнении выполянется функция
        success: function (data) {
            $('#add_edit_modal').modal('hide');
            getAllBook();
        },
        //если не успешно 404 401 403 400 422
        error: function (xhr, textStatus, error) {
            //чтоб получить и проверить статус код
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}


function Edit(id) {

}

function Delete(id) {
    console.log("Delete " + id)
}

function getAllBook() {
    $.ajax({
        url: 'http://aboba/controller/books/getAll.php',
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
                let pathImg = $("<td></td>");
                let yearOfIssue = $("<td></td>");
                let summary = $("<td></td>");
                let actions = $("<td></td>");

                let action_edit = $("<button type='button' class='btn btn-info mr-1'>Редактировать</button>");
                let action_delete = $("<button type='button' class='btn btn-danger'>Удалить</button>");


                action_edit.on("click", () => Edit(author.id))
                action_delete.on("click", () => Delete(author.id))

                actions.append(action_edit);
                actions.append(action_delete);

                id.text(book.id);
                name.text(book.title);
                //TODO add genre
                authors.text(book.authors.join(", "));
                pathImg.text(book.pathImg);
                yearOfIssue.text(book.yearOfIssue);
                summary.text(book.summary);


                row.append(id);
                row.append(name);
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
        sendButton.on('click', Add);
        sendButton.text('Добавить');

        $('.text-danger').text('');

        $('#add_edit_modal').modal('show');

    });
})
