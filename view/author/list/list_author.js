function Add(event) {
    $.ajax({
        type: 'POST',
        url: '/controller/authors/createAuthor.php',
        // устанавливаем что получаемый тип данных json
        dataType: 'json',
        data: $('#sample_form').serialize(),
        // при успешном выполнении выполянется функция
        success: function (data) {
            //скрываем модальное окошко
            $('#add_edit_modal').modal('hide');
            // обновляем и отрисовывваем все книжки с сервера
            getAllAuthors();
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

function Edit(id) {
    console.log('edit')
    console.log(id)
    let first_name = $('#first_name').val();
    let last_name = $('#last_name').val();
    let patronymic = $('#patronymic').val();

    let form = new FormData()

    let request_data = {

        'id': id,
        'firstName': first_name,
        'lastName': last_name,
        'patronymic': patronymic
    }
    console.log(request_data)
    for (let key in request_data) {
        console.log(`key ${key} value ${request_data[key]}`)
        form.append(key, request_data[key]);
    }


    // отправляем данные на сервер
    fetch("/controller/authors/updateAuthor.php",
        {
            body: form,
            method: "POST"
        })
        .then(res => res.json())
        .then(data => {
            $('#add_edit_modal').modal('hide');
            // обновляем и отрисовывваем все книжки с сервера
            getAllAuthors();
        })
        .catch(err => console.log(err));


}


function EditModal(id) {
    $('#dynamic_modal_title').text('Редактировать автора');

    $('#action').val('Изменить');

    let sendButton = $('#action_button');
    sendButton.off("click")
    sendButton.on('click', () => Edit(id));
    sendButton.text(`Редактировать`);

    //Cброс формы и всех ее значений инуптов
    $('#sample_form')[0].reset();

    // можно будет потом потом добавить выворлд ошибок валидации
    $('.text-danger').text('');

    // TODO get author from api whith id
    fetch(`/controller/authors/getAuthorWithId.php?id=${id}`)
        .then(res => res.json())
        .then(author => {

            $('#first_name').val(author.firstName);
            $('#last_name').val(author.lastName);
            $('#patronymic').val(author.patronymic);

            $('#add_edit_modal').modal('show');

        })
}


function Delete(id) {
    console.log("Delete " + id)
}

function getAllAuthors() {
    $.ajax({
        url: '/controller/authors/getAll.php',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            let authorsHtml = $("#authors");
            authorsHtml.empty()

            for (let i = 0; i < data.length; i++) {
                let author = data[i]
                let row = createHtmlAuthors(author);
                authorsHtml.append(row)

                // console.log(data[i])

            }
        }
    });
}

function createHtmlAuthors(author) {

    let row = $("<tr></tr>");
    // row.addClass("row")

    let id = $('<th  scope="row"></th>');
    let firstName = $("<td></td>");
    let lastName = $("<td></td>");
    let patronymic = $("<td></td>");
    let actions = $("<td></td>");

    let action_edit = $("<button type='button' class='btn btn-info mr-1'>Редактировать</button>");
    let action_delete = $("<button type='button' class='btn btn-danger'>Удалить</button>");

    action_edit.on("click", () => EditModal(author.id))
    action_delete.on("click", () => Delete(author.id))

    actions.append(action_edit);
    actions.append(action_delete);

    id.text(author.id);
    firstName.text(author.firstName);
    lastName.text(author.lastName);
    patronymic.text(author.patronymic);


    row.append(id);
    row.append(firstName);
    row.append(lastName);
    row.append(patronymic);
    row.append(actions);
    return row;
}

$(document).ready(function () {

    $(function () {
        getAllAuthors()
        $('#footer').load('/view/global/footer/footer.html')
        $('#edit_add').load('/view/author/add_edit_author.html')
    });

    $('#add_data').click(function () {


        $('#dynamic_modal_title').text('Добавить автора');

        $('#sample_form')[0].reset();

        $('#action').val('Добавить');

        let sendButton = $('#action_button');
        sendButton.off("click")
        sendButton.click(() => Add());
        sendButton.text('Добавить');

        $('.text-danger').text('');

        $('#add_edit_modal').modal('show');

    });

})
