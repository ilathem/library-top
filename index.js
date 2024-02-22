let myLibrary = []

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.info = () => {
            return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'is read' : 'not read yet'}.`);
        };
    }
}

const addBookToLibrary = (book) => myLibrary.push(book);

addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', '295', false))
addBookToLibrary(new Book('Harry Potter and the Sorcerer\s Stone', 'J.S. Rowling', '333', false))
addBookToLibrary(new Book('The Ranger\'s Apprentice: The Ruins of Gorlan', 'John Flanagan', '266', false))

const removeBook = (title) => {
    myLibrary = myLibrary.filter(book => book.title !== title);
    displayBooks();
}

const toggleReadStatus = (title) => {
    let isRead = '';
    for (const book of myLibrary) {
        if (book.title === title) {
            book.isRead = !book.isRead;
            isRead = book.isRead;
        }
    }
    const book = document.querySelector(`[title="${title}"]`);
    for (const child of book.children) {
        if (child.innerText.includes('Read')) {
            child.innerText = isRead ? 'Is Read' : 'Not Read';
        }
    }
}

const displayBooks = () => {
    const books = document.querySelector('#books');
    books.innerHTML = "";
    for (const book of myLibrary) {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add('book');
        const title = document.createElement("p");
        title.innerText = book.title;
        const author = document.createElement("p");
        author.innerText = book.author;
        const pages = document.createElement("p");
        pages.innerText = book.pages;
        const isRead = document.createElement("p");
        isRead.innerText = book.isRead ? 'Is Read' : 'Not Read';
        const removeBookBtn = document.createElement("button")
        removeBookBtn.innerText = "Remove book"
        removeBookBtn.classList.add('removeBookBtn');
        removeBookBtn.addEventListener('click', () => {
            removeBook(book.title)
        })
        const readBookBtn = document.createElement('button');
        readBookBtn.innerText = "Toggle read status"
        readBookBtn.classList.add('readBookBtn')
        readBookBtn.addEventListener('click', () => {
            toggleReadStatus(book.title);
        })
        bookDiv.appendChild(readBookBtn);
        bookDiv.appendChild(removeBookBtn);
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(isRead);
        bookDiv.setAttribute('title', book.title)
        books.appendChild(bookDiv);
    }
}

displayBooks();

const dialog = document.querySelector("#dialog");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pageCount = document.querySelector("#pageCount");
const isRead = document.querySelector("#isRead");

document.querySelector("#newBookBtn").addEventListener('click', () => dialog.showModal())
document.querySelector("#submitBookBtn").addEventListener('click', () => {
    addBookToLibrary(new Book(
        title.value,
        author.value,
        pageCount.value,
        isRead.checked
    ))
    dialog.close()
    title.value = '';
    author.value = '';
    pageCount.value = '';
    isRead.checked = false;
    displayBooks();
})
