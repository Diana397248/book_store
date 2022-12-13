let template = () =>  $(`<div class="col mb-5">
                <div class="card h-100 pt-5">
                    <div class=" card-header header-color-none">
                        <a class="book-container  pb-5" href="https://theoutstanding.dev/" target="_blank"
                           rel="noreferrer noopener">
                            <div class="book">
                                <img id='img' alt="img"
                                     onerror='this.src="data:image/png;base64,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"'/>
                            </div>
                        </a>
                    </div>
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 id="name" class="fw-bolder">Special Item</h5>
                            <!-- Product reviews         TODO-->
<!--                            <div class="d-flex justify-content-center small text-warning mb-2">-->
<!--                                <div class="bi-star-fill"></div>-->
<!--                                <div class="bi-star-fill"></div>-->
<!--                                <div class="bi-star-fill"></div>-->
<!--                                <div class="bi-star-fill"></div>-->
<!--                                <div class="bi-star-fill"></div>-->
<!--                            </div>-->
<!--Ckidka-->
<!--                            &lt;!&ndash; Product price&ndash;&gt;-->
<!--                            <span class="text-muted text-decoration-line-through">$20.00</span>-->
<!--                            <span><span id="price">1893.00</span> руб.</span>-->
                        </div>
                    </div>
                    <!-- Product actions TODO добвить в корзину-->
<!--                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">-->
<!--                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to-->
<!--                            cart</a></div>-->
<!--                    </div>-->
                </div>
            </div>`)

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


                let row = template();

                let id = $('<th  scope="row"></th>');
                let authors = $("<td></td>");
                let yearOfIssue = $("<td></td>");
                let summary = $("<td></td>");



                id.text(book.id);
                row.find('#name').text(book.title);
                //TODO add cost
                row.find('#price').text('1900');
                row.find('#img').attr('src',book.pathImg);
                //TODO add genre
                authors.text(book.authors.join(", "));
                yearOfIssue.text(book.yearOfIssue);
                summary.text(book.summary);





                $booksHtml.append(row)

                // console.log(data[i])

            }
        }
    });

}

$(document).ready(function () {
    getAllBook();
});