const myLibrary = [];

// Book Class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = Number(pages);
        this.read = read;
        this.readStatus = read ? "Read ✅" : "Not Read ❌";
        this.id = crypto.randomUUID();
    }

    info () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

    updateReadStatus () {
        this.read = !this.read;
        this.readStatus = this.read ? "Read ✅" : "Not Read ❌";
        return this.readStatus;
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

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
    let pages = Number(bookPages.value.trim());
    let readStatus = bookReadStatus.checked;

    // input validation
    if (!title || !author || !pages || isNaN(pages)) {
        alert("Please enter valid book details.");
        return;
    }

    // updating page
    let newBook = new Book(title, author, pages, readStatus);
    displayBook(newBook);

    // updating myLibrary
    addBookToLibrary(newBook);

    // close dialog
    dialog.close();

    // reset inputs
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookReadStatus.checked = false;
})

// testing..
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const theMountain = new Book("The Mountain Is You", "Brianna West", 355, false)
const thingsFallApart = new Book("Things Fall Apart", "Chinua Achebe", 209, false);
const proGit = new Book("Pro Git", "Scott Chacon and Ben Straub ", 501, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theMountain);
addBookToLibrary(thingsFallApart);
addBookToLibrary(proGit);

function createTableRow(book) {
    let row = document.createElement("tr");
    let title = document.createElement("td");
    let author = document.createElement("td");
    let pages = document.createElement("td");
    let readStatus = document.createElement("td");
    let deleteBtn = document.createElement("td");
    let deleteIcon = document.createElement("img");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    readStatus.textContent = book.readStatus;

    readStatus.setAttribute("class", "read-state");
    readStatus.setAttribute("title", "Toggle Read Status");

    deleteIcon.setAttribute("src", "./images/delete.svg");
    deleteIcon.setAttribute("alt", "delete");

    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.appendChild(deleteIcon);

    row.append(title, author, pages, readStatus, deleteBtn);
    return row;

}

let tableBody = document.querySelector("tbody");

function displayBook(book) {
    let row = createTableRow(book);
    row.setAttribute("data-id", book.id);
    tableBody.appendChild(row);
}

function displayBooks(library) {
    for (book of library) {
        let row = createTableRow(book);
        row.setAttribute("data-id", book.id);
        tableBody.appendChild(row);
    }
}

displayBooks(myLibrary);

tableBody.addEventListener("click", (event) => {
    // Handle delete button clicks
    if (event.target.parentElement.classList.contains("delete-btn")) {
        let id = event.target.closest('td').parentElement.dataset.id;
        let index = myLibrary.findIndex((book) => book.id === id);
        myLibrary.splice(index, 1);
        event.target.closest('td').parentElement.remove();
    }

    // Handle read state button clicks
    if (event.target.classList.contains("read-state")) {
        let id = event.target.parentElement.dataset.id;
        let index = myLibrary.findIndex((book) => book.id === id);
        event.target.textContent = myLibrary[index].updateReadStatus();
    }
});