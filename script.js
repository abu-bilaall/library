const myLibrary = [];

// element selection and assignment
const dialog = document.querySelector("dialog");
const addNewBook = document.querySelector(".add-book");
const closeDialog = document.querySelector(".close-dialog");
const addBookBtn = document.querySelector(".add-new-book");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookReadStatus = document.querySelector("#read-status");

// check if elements are correctly selected
if (!dialog || !addNewBook || !addBookBtn || !bookTitle || !bookAuthor || !bookPages || !bookReadStatus) {
    console.error("One or more DOM elements could not be found. Check selectors.");
}

addNewBook.addEventListener("click", () => {
    dialog.showModal();
});

addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // value-housekeeping..
    let title = bookTitle.value.trim();
    let author = bookAuthor.value.trim();
    let pages = bookPages.value.trim();
    let readStatus = bookReadStatus.checked ? "Read" : "Not Read";

    // input validation
    if (!title || !author || !pages || isNaN(pages)) {
        alert("Please enter valid book details.");
        return;
    }

    // updating myLibrary
    addBookToLibrary(title, author, pages, readStatus);

    // close dialog
    dialog.close();

    // reset inputs
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookReadStatus.checked = false;
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("the Hobbit", "J.R.R Tolkien", 295, "not read yet");
addBookToLibrary("The Mountain Is You", "Brianna West", 355, "not read yet");

function displayBook(library) {
    for (book of library) {
        console.log(book);
    }
}

displayBook(myLibrary);