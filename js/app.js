// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// search result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.visibility = displayStyle;
}
toggleSpinner('none');

// search books
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // show spinner
    toggleSpinner('block');
    // search result hide
    toggleSearchResult('hidden');
    // when spinner loading both are empty
    document.getElementById('error').innerText = '';
    document.getElementById('result-count').innerText = '';

    // clear search field
    searchField.value = '';

    // error check for empty string
    if (searchText === '') {
        alert("please put valid input!!");
    }
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
}
// show search results
const displaySearchResult = data => {
    const books = data.docs.slice(0, 30)
    const searchResult = document.getElementById('search-result');

    // clear searchresult
    searchResult.textContent = '';

    // error handle for wrong input value
    if (books.length === 0) {
        toggleSpinner('none');
        const errorBox = document.getElementById('error');
        errorBox.innerText = 'no result found';
    }
    // show total search result count
    else {
        document.getElementById('result-count').innerText = `Result Found: ${data.numFound} Books`
    }

    books.forEach(book => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img img-fluid src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' class="card-img-top" alt="...">
                <div class="card-body">
                     <h5 class="card-title">${book.title}</h5>
                     <p class="card-text">by ${book.author_name ? book.author_name : 'unknown'}</p>
                     <p class="card-text"><strong>first published: ${book.first_publish_year ? book.first_publish_year : 'unknown'}</strong></p>
                     <p class="card-text"><strong>publisher: ${book.publisher ? book.publisher : 'unknown'}</strong></p>
                </div>
            </div>    
        `;
        searchResult.appendChild(div);
    })
    // spinner hide
    toggleSpinner('none');
    // show search result
    toggleSearchResult('visible');
}