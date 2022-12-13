let genresSelect = document.querySelector("#genres");

fetch("/controller/genre/getAll.php")
    .then(res => res.json())
    .then(genres => {
        // <option value="2">Two</option>
        console.log(genres)
        for (let genre of genres) {
            let option = document.createElement("option")
            option.value = genre.id;
            option.textContent = genre.genre;
            genresSelect.append(option);
        }
    })


