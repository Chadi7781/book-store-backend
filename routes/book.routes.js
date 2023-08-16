// routes/bookRoutes.js

const express = require("express");
const bookController = require("../controllers/book.controller");

const router = express.Router();
router.get("/BookAsync", bookController.getAllBooksAsync); // New async route

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.get("/getByAuthor/:author", bookController.getBookByAuthor);
router.get("/getByTitle/:title", bookController.getBookByTitle);
router.get("/getBookReview/:id", bookController.getBookReview);

router.post("/", bookController.createBook);
router.post("/addReview/:id", bookController.createReviewBook);
router.delete("/deleteReviewBook/:id", bookController.deleteReviewBook);

router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
