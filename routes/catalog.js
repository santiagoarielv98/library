const express = require("express");
const router = express.Router();
const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 50, // 50 requests,
});

// Require controller modules.
const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookinstanceController");

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", limiter, book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/book/create", limiter, book_controller.book_create_get);

// POST request for creating Book.
router.post("/book/create", limiter, book_controller.book_create_post);

// GET request to delete Book.
router.get("/book/:id/delete", limiter, book_controller.book_delete_get);

// POST request to delete Book.
router.post("/book/:id/delete", limiter, book_controller.book_delete_post);

// GET request to update Book.
router.get("/book/:id/update", limiter, book_controller.book_update_get);

// POST request to update Book.
router.post("/book/:id/update", limiter, book_controller.book_update_post);

// GET request for one Book.
router.get("/book/:id", limiter, book_controller.book_detail);

// GET request for list of all Book items.
router.get("/books", limiter, book_controller.book_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", limiter, author_controller.author_create_get);

// POST request for creating Author.
router.post("/author/create", limiter, author_controller.author_create_post);

// GET request to delete Author.
router.get("/author/:id/delete", limiter, author_controller.author_delete_get);

// POST request to delete Author.
router.post("/author/:id/delete", limiter, author_controller.author_delete_post);

// GET request to update Author.
router.get("/author/:id/update", limiter, author_controller.author_update_get);

// POST request to update Author.
router.post("/author/:id/update", limiter, author_controller.author_update_post);

// GET request for one Author.
router.get("/author/:id", limiter, author_controller.author_detail);

// GET request for list of all Authors.
router.get("/authors", limiter, author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", limiter, genre_controller.genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", limiter, genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", limiter, genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", limiter, genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", limiter, genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", limiter, genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", limiter, genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", limiter, genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get("/bookinstance/create", limiter, book_instance_controller.bookinstance_create_get);

// POST request for creating BookInstance.
router.post("/bookinstance/create", limiter, book_instance_controller.bookinstance_create_post);

// GET request to delete BookInstance.
router.get("/bookinstance/:id/delete", limiter, book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post("/bookinstance/:id/delete", limiter, book_instance_controller.bookinstance_delete_post);

// GET request to update BookInstance.
router.get("/bookinstance/:id/update", limiter, book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post("/bookinstance/:id/update", limiter, book_instance_controller.bookinstance_update_post);

// GET request for one BookInstance.
router.get("/bookinstance/:id", limiter, book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get("/bookinstances", limiter, book_instance_controller.bookinstance_list);

module.exports = router;
