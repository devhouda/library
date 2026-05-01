const books = document.querySelector(".books");
const table = document.querySelector("table");
const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-btn");

// const myLibrary = [];
const myLibrary = [
  {
    id: crypto.randomUUID(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    read: "read",
  },
  {
    id: crypto.randomUUID(),
    title: "1984",
    author: "George Orwell",
    pages: 328,
    read: "not read yet",
  },
  {
    id: crypto.randomUUID(),
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: "not read yet",
  },
];

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const newBook = new Book(id, title, author, pages, read);
  myLibrary.push(newBook);
}

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
// console.log(theHobbit.info());

function displayBooks() {
  books.innerHTML = ""; // 🧠 clear table first
  myLibrary.forEach((book) => {
    const newBook = document.createElement("tr");
    newBook.setAttribute("data-id", book.id);
    const title = document.createElement("td");
    title.textContent = book.title;
    const author = document.createElement("td");
    author.textContent = book.author;
    const pages = document.createElement("td");
    pages.textContent = book.pages;
    const read = document.createElement("td");
    read.textContent = book.read;
    const removeTd = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.textContent = "Remove";
    removeTd.appendChild(removeBtn);
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);
    newBook.appendChild(removeTd);
    books.appendChild(newBook);
  });
}

function createForm() {
  if (document.querySelector("form")) return; // 🚫 don't create twice
  const form = document.createElement("form");
  const bookNameInput = document.createElement("input");
  bookNameInput.setAttribute("placeholder", "Book Title");
  bookNameInput.setAttribute("id", "title");
  const bookAuthorInput = document.createElement("input");
  bookAuthorInput.setAttribute("placeholder", "Author");
  bookAuthorInput.setAttribute("id", "author");
  const bookPagesInput = document.createElement("input");
  bookPagesInput.setAttribute("placeholder", "Number of pages");
  bookPagesInput.setAttribute("id", "pages");
  const bookStatusInput = document.createElement("input");
  bookStatusInput.setAttribute("placeholder", "read or not read yet");
  bookStatusInput.setAttribute("id", "read");
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.setAttribute("id", "submit");
  form.appendChild(bookNameInput);
  form.appendChild(bookAuthorInput);
  form.appendChild(bookPagesInput);
  form.appendChild(bookStatusInput);
  form.appendChild(submitBtn);
  container.appendChild(form);
}

newBookBtn.addEventListener("click", () => {
  table.style.display = "none";
  createForm();
  const submitBtn = document.querySelector("#submit");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let titleValue = document.querySelector("#title").value;
    let authorValue = document.querySelector("#author").value;
    let pagesValue = document.querySelector("#pages").value;
    let readValue = document.querySelector("#read").value;
    addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
    table.style.removeProperty("display");
    const form = document.querySelector("form");
    form.style.display = "none";
    displayBooks();
  });
});

displayBooks();

books.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const row = e.target.closest("tr");
    const id = row.dataset.id;

    const index = myLibrary.findIndex((book) => book.id === id);

    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  }
});
