function Add(event) {
    // отправляем данные на сервер
    $.ajax({
        type: 'POST',
        url: 'http://aboba/controller/books/createBook.php',
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

    // TODO get author from api whith id
    let author = {

        "id": id,
        "name": "name",
        "authors": "authors",
        "idGenre": "idGenre",
        "pathImg": "pathImg",
        "yearOfIssue": "yearOfIssue",
        "summary": "summary"
    };


    $('#dynamic_modal_title').text('Редактировать книгу');

    //Cброс формы и всех ее значений инуптов
    $('#sample_form')[0].reset();

    // это обязательно должно ПОСЛЕ СБРОСА ФОРМЫ
    $('#first_name').val(author.firstName);
    $('#last_name').val(author.lastName);
    $('#patronymic').val(author.patronymic);

    $('#action').val('Изменить');

    let sendButton = $('#action_button');
    sendButton.on('click', () => Edit(author.id)
    );
    sendButton.text('Изменить');

    // можно будет потом потом добавить выворлд ошибок валидации
    $('.text-danger').text('');

    $('#add_edit_modal').modal('show');


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
                
                action_edit.on("click", () => EditModal(book.id))
                action_delete.on("click", () => Delete(book.id))
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
