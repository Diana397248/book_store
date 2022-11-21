$(document).ready(function() {
    $.getJSON("/resources/json/genre.json", function (data) {

        for (let i = 0; i < data.length; i++) {

            let genre = data[i]
            let row = $("<tr></tr>");
            // row.addClass("row")

            let id = $('<th  scope="row"></th>');
            let nameGenre = $("<td></td>");


            id.text(genre.id)
            nameGenre.text(genre.genre)


            row.append(id)
            row.append(nameGenre)

            $("#genres").append(row)


            // console.log(data[i])

        }

    })

    $(function () {
        $('#footer').load('/view/global/footer/footer.html')
        $('#edit_add').load('/view/genre/add_edit_genre.html')
    });
    $('#add_data').click(function () {
        $('#dynamic_modal_title').text('Add Data');

        $('#sample_form')[0].reset();

        $('#action').val('Add');

        $('#action_button').text('Add');

        $('.text-danger').text('');

        $('#add_edit_modal').modal('show');

    });
})