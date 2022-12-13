function Add(event) {

    let year_of_issue = $('#year_of_issue').val();
    let summary = $('#summary').val();
    let title = $('#title').val();
    let genre = $('#genres').val();
    let formData = new FormData()

    let request_data = {
        "idGenre": genre,
        "title": title,
        "yearOfIssue": year_of_issue,
        "summary": summary
    }
    console.log(request_data)
    for (let key in request_data) {
        console.log(`key ${key} value ${request_data[key]}`)
        formData.append(key, request_data[key]);
    }
    const fileInput = document.querySelector('#path_img');
    formData.append('file', fileInput.files[0]);
    const options = {
        method: 'POST',
        body: formData,
    };

    fetch('/controller/books/createBook.php', options)
        .then(res => {
            $('#add_edit_modal').modal('hide');
            // обновляем и отрисовывваем все книжки с сервера
            getAllBook();
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
            $('#pre_img').attr("src", book.pathImg);
            $('#pre_img').show()
            $('#year_of_issue').val(book.yearOfIssue);
            $('#summary').val(book.summary);

            $('#add_edit_modal').modal('show');

        })

}

function Edit(id) {
    console.log('edit')
    console.log(id)
    let year_of_issue = $('#year_of_issue').val();
    let summary = $('#summary').val();
    let title = $('#title').val();
    let genre = $('#genres').val();

    let form = new FormData()

    let request_data = {
        "id": id,
        "idGenre": genre,
        "title": title,
        "yearOfIssue": year_of_issue,
        "summary": summary,
    }
    for (let key in request_data) {
        console.log(`key ${key} value ${request_data[key]}`)
        form.append(key, request_data[key]);
    }
    const fileInput = document.querySelector('#path_img');
    form.append('file', fileInput.files[0]);
    const options = {
        method: 'POST',
        body: form,
    };

    // отправляем данные на сервер
    fetch("/controller/books/updateBook.php", options)
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

function getAllBook(search, genreValue) {
    $.ajax({
        url: `/controller/books/getAll.php?search=${search || ""}&genre_sort=${genreValue || "asc"}`,
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

                let img = $("<img style='width: 150px; height: 150px;;'>")
                img.attr('src', book.pathImg)
                pathImg.append(img);
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

function search() {
    let searchText = document.querySelector("#search_input").value;
    let genreValue = document.querySelector("#genre_search").value;
    getAllBook(searchText, genreValue);
}

$(document).ready(function () {

    getAllBook();
    $(function () {
        $('#footer').load('/view/global/footer/footer.html')
        $('#edit_add').load('/view/book/add_edit_book.html')
    });
    document.querySelector("#search").addEventListener("click", search)
    $('#add_data').click(function () {

        $('#dynamic_modal_title').text('Добавить книгу');
        $('#pre_img').hide()

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
