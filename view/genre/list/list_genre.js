// $(document).ready(function () {
    // $.getJSON("/resources/json/genre.json", function (data) {
    //
    //     for (let i = 0; i < data.length; i++) {
    //
    //         let genre = data[i]
    //         let row = $("<tr></tr>");
    //         // row.addClass("row")
    //
    //         let id = $('<th  scope="row"></th>');
    //         let nameGenre = $("<td></td>");
    //
    //
    //         id.text(genre.id)
    //         nameGenre.text(genre.genre)
    //
    //
    //         row.append(id)
    //         row.append(nameGenre)
    //
    //         $("#genres").append(row)
    //
    //
    //         // console.log(data[i])
    //
    //     }
    //
    // })    Э
function Add(event) {
    // отправляем данные на сервер
    $.ajax({
        type: 'POST',
        url: 'http://aboba/controller/genre/createGenre.php',
        // устанавливаем что получаемый тип данных json
        dataType: 'json',
        data: $('#sample_form').serialize(),
        // при успешном выполнении выполянется функция
        success: function (data) {
            //скрываем модальное окошко
            $('#add_edit_modal').modal('hide');
            // обновляем и отрисовывваем все книжки с сервера
            getAllGenre();
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
    let genre = {
        "id": id,
        "name": "name",

    };


    $('#dynamic_modal_title').text('Редактировать жанр');

    //Cброс формы и всех ее значений инуптов
    $('#sample_form')[0].reset();

    // это обязательно должно ПОСЛЕ СБРОСА ФОРМЫ
    $('#name').val(genre.name);


    $('#action').val('Изменить');

    let sendButton = $('#action_button');
    sendButton.on('click', () => Edit(genre.id)
    );
    sendButton.text('Изменить');

    // можно будет потом потом добавить выворлд ошибок валидации
    $('.text-danger').text('');

    $('#add_edit_modal').modal('show');


}

function Edit(id) {
    let name = $('#name').val();

    let request_data = {

        'id': id,
        'name': name,
    }


    // console.log(request_data)
}

function Delete(id) {
    console.log("Delete " + id)
}

function getAllGenre() {
        $.ajax({
            url: 'http://aboba/controller/genre/getAll.php',
            method: 'get',
            dataType: 'json',
            success: function (data) {
                let $genresHtml = $("#genres");
                $genresHtml.empty()

                for (let i = 0; i < data.length; i++) {
                    let genre = data[i]
                    let row = $("<tr></tr>");

                    let id = $('<th  scope="row"></th>');
                    let name = $("<td></td>");
                    let actions = $("<td></td>");

                    let action_edit = $("<button type='button' class='btn btn-info mr-1'>Редактировать</button>");
                    let action_delete = $("<button type='button' class='btn btn-danger'>Удалить</button>");

                    action_edit.on("click", () => EditModal(genre.id))
                    action_delete.on("click", () => Delete(genre.id))

                    actions.append(action_edit);
                    actions.append(action_delete);

                    id.text(genre.id);
                    name.text(genre.genre);



                    row.append(id);
                    row.append(name);
                    row.append(actions);


                    $genresHtml.append(row)

                    // console.log(data[i])

                }
            }
        });
    }

$(document).ready(function () {
    getAllGenre();
    $(function () {
        $('#footer').load('/view/global/footer/footer.html')
        $('#edit_add').load('/view/genre/add_edit_genre.html')
    });
    $('#add_data').click(function () {
        $('#dynamic_modal_title').text('Добавить Жанр');

        $('#sample_form')[0].reset();

        $('#action').val('Добавить');

        let sendButton = $('#action_button');
        sendButton.on('click', Add);
        sendButton.text('Добавить');

        // $('#action_button').text('Add');

        $('.text-danger').text('');

        $('#add_edit_modal').modal('show');

    });
})

