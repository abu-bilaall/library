const myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary (title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("the Hobbit", "J.R.R Tolkien", 295, "not read yet");
addBookToLibrary("The Mountain Is You", "Brianna West", 355, "not read yet");

function displayBook (library) {
    for (book of library) {
        console.log(book);
    }
}

displayBook(myLibrary);