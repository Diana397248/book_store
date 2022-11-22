function Add(event) {
    console.log("Edit ")
    let first_name = $('#first_name').val();
    let last_name = $('#last_name').val();
    let patronymic = $('#patronymic').val();

    let request_data = {

        'firstName': first_name,
        'lastName': last_name,
        'patronymic': patronymic
    }
    console.log(request_data)
}


function Edit(id) {

}

function Delete(id) {
    console.log("Delete " + id)
}

$(document).ready(function () {
    $.getJSON("/resources/json/authors.json", function (data) {
        let authorsHtml = $("#authors")
        for (let i = 0; i < data.length; i++) {

            let author = data[i]
            let row = $("<tr></tr>");
            // row.addClass("row")

            let id = $('<th  scope="row"></th>');
            let firstName = $("<td></td>");
            let lastName = $("<td></td>");
            let patronymic = $("<td></td>");
            let actions = $("<td></td>");

            let action_edit = $("<button type='button' class='btn btn-info mr-1'>Редактировать</button>");
            let action_delete = $("<button type='button' class='btn btn-danger'>Удалить</button>");

            action_edit.on("click", () => Edit(author.id))
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

            authorsHtml.append(row);


            // console.log(data[i])

        }
        authorsHtml.empty()
    })

    $(function () {
        $('#footer').load('/view/global/footer/footer.html')
        $('#edit_add').load('/view/author/add_edit_author.html')
    });

    $('#add_data').click(function () {


        $('#dynamic_modal_title').text('Добавить автора');

        $('#sample_form')[0].reset();

        $('#action').val('Добавить');

        let sendButton = $('#action_button');
        sendButton.on('click', Add);
        sendButton.text('Добавить');

        $('.text-danger').text('');

        $('#add_edit_modal').modal('show');

    });

})
