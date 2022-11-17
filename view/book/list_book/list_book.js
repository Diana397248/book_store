$(document).ready(function () {
    // $(".btn2").on("click", function (){
    // alert("readi")
    //     console.log("gg")
    // })
    // $.getJSON("json/books.json", function (data) {
    //
    //     for (let i = 0; i < data.length; i++) {
    //
    //         let book = data[i]
    //         let row = $("<tr></tr>");
    //         // row.addClass("row")
    //
    //         let authors = $("<td></td>");
    //         let name = $("<td></td>");
    //         let id = $('<th  scope="row"></th>');
    //
    //         id.text(book.id)
    //         name.text(book.name)
    //         authors.text(book.authors.join(", "))
    //
    //         row.append(id)
    //         row.append(name)
    //         row.append(authors)
    //
    //         $("#books").append(row)
    //
    //
    //         console.log(data[i])
    //
    //     }
    //
    // })


    $.ajax({
        url:'https://63726dea348e947299f54b07.mockapi.io/api/messages',
        method: 'get',
        dataType: 'json',
        success: function (data) {

            for (let i = 0; i < data.length; i++) {

                let book = data[i]
                let row = $("<tr></tr>");
                // row.addClass("row")

                let authors = $("<td></td>");
                let name = $("<td></td>");
                let id = $('<th  scope="row"></th>');

                id.text(book.id)
                name.text(book.name)
                authors.text(book.authors.join(", "))

                row.append(id)
                row.append(name)
                row.append(authors)

                $("#books").append(row)


                console.log(data[i])

            }

        }
    })
})
