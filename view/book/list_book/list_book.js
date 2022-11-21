function Add(event) {
    console.log("Edit ")
    let book_name = $('#' +
        '').val();
    let path_img = $('#path_img').val();
    let year_of_issue = $('#year_of_issue').val();
    let summary = $('#summary').val();

    let request_data = {

        'title': book_name,
        'path_img': path_img,
        'year_of_issue': year_of_issue,
        'summary': summary,
    }
    console.log(request_data)
}


function Edit(id) {

}

function Delete(id) {
    console.log("Delete " + id)
}


$(document).ready(function () {
    $.getJSON("json/books.json", function (data) {

        for (let i = 0; i < data.length; i++) {

            let book = data[i]
            let row = $("<tr></tr>");
            // row.addClass("row")

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
            name.text(book.name);
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

            $("#books").append(row)

            // console.log(data[i])

        }

    });

    // $.ajax({
    //     url: 'https://63726dea348e947299f54b07.mockapi.io/api/messages',
    //     method: 'get',
    //     dataType: 'json',
    //     success: function (data) {
    //
    //         for (let i = 0; i < data.length; i++) {
    //
    //             let book = data[i]
    //             let row = $("<tr></tr>");
    //             // row.addClass("row")
    //
    //             let authors = $("<td></td>");
    //             let name = $("<td></td>");
    //             let id = $('<th  scope="row"></th>');
    //
    //             id.text(book.id)
    //             name.text(book.name)
    //             authors.text(book.authors.join(", "))
    //
    //             row.append(id)
    //             row.append(name)
    //             row.append(authors)
    //
    //             $("#books").append(row)
    //
    //
    //             console.log(data[i])
    //
    //         }
    //
    //     }
    // })

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
