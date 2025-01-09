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

// event listeners
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

// the Book constructor
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

// testing..
addBookToLibrary("the Hobbit", "J.R.R Tolkien", 295, "not read yet");
addBookToLibrary("The Mountain Is You", "Brianna West", 355, "not read yet");
addBookToLibrary("the Hobbit", "J.R.R Tolkien", 295, "not read yet");
addBookToLibrary("The Mountain Is You", "Brianna West", 355, "not read yet");

function createTableRow (titleContent, authorContent, pagesContent, readStatusContent) {
    let row = document.createElement("tr");
    let title = document.createElement("td");
    let author = document.createElement("td");
    let pages = document.createElement("td");
    let readStatus = document.createElement("td");
    let deleteBtn = document.createElement("td");
    let deleteIcon = document.createElement("img");

    title.textContent = titleContent;
    author.textContent = authorContent;
    pages.textContent = pagesContent;
    readStatus.textContent = readStatusContent;

    deleteIcon.setAttribute("src", "./images/delete.svg");
    deleteIcon.setAttribute("alt", "delete");

    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.appendChild(deleteIcon);

    row.append(title, author, pages, readStatus, deleteBtn);
    return row;

}

function displayBook(library) {
    let tableBody = document.querySelector("tbody");

    for (book of library) {
        let row = createTableRow(book.title, book.author, book.pages, book.read);
        row.setAttribute("data-index", library.indexOf(book));
        tableBody.appendChild(row);
    }
}

displayBook(myLibrary);

const deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach(button => {
    button.addEventListener("click", () => {
        let index = button.parentElement.dataset.index;
        myLibrary.splice(index, 1);
        button.parentElement.remove();
    });
});