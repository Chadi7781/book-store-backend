// controllers/bookController.js
const axios = require("axios");

const books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    reviews: [],
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
    reviews: [],
  },
];

// controllers/bookController.js

const booksEndpoint = "http://localhost:5000/book"; // Replace with your actual API endpoint

// ... (previous code)

exports.getAllBooksAsync = async (req, res) => {
  try {
    console.log("hi");
    const response = await axios.get(booksEndpoint);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllBooks = (req, res) => {
  res.json({ books: books });
};

exports.getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};
exports.getBookByAuthor = (req, res) => {
  const author = req.params.author;
  const book = books.find((a) => a.author === author);
  console.log(book);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Bookxxxx not found" });
  }
};
exports.getBookByTitle = (req, res) => {
  const title = req.params.title;
  const book = books.find((a) => a.title === title);
  console.log(book);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

exports.getBookReview = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const book = books.find((a) => a.id === id);
  console.log(book);

  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Review for ISBN book not found" });
  }
};

exports.createBook = (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    reviews: [],
  };

  books.push(newBook);
  res.status(201).json(newBook);
};

exports.createReviewBook = (req, res) => {
  const id = parseInt(req.params.id);

  const review = req.body.reviews;

  const book = books.find((a) => a.id === id);
  console.log(book);

  if (book) {
    book.reviews = review;
  } else {
    res.send("isbn book not found");
  }

  res.send(`The review for the book ISBN ${id} has been added/updated `);
};
exports.deleteReviewBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (book) {
    book.reviews = [];
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

exports.updateBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find((book) => book.id === bookId);

  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

exports.deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};
