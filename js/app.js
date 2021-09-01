// search books
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear search field
    searchField.value = '';

    if (searchText === '') {
        alert("put valid input!!");
    }

    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))

}
// show search results
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');

    // clear searchresult
    searchResult.textContent = '';

    // count search result
    document.getElementById('result-count').innerText = `Result Found: ${books.length} Books`

    books.forEach(book => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' class="card-img-top" alt="...">
                <div class="card-body">
                     <h5 class="card-title">${book.title}</h5>
                     <p class="card-text">by ${book.author_name}</p>
                     <p class="card-text"><strong>first published: ${book.first_publish_year}</strong></p>
                     <p class="card-text"><strong>publisher: ${book.publisher}</strong></p>
               </div>
        `;
        searchResult.appendChild(div);
    })
}