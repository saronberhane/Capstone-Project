const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const protect = require("../protect/index");
const authByRole = require("../auth");


const {
    createBook,
    getByGenreOrPrice,
    getAllBooks,
    updateBook,
    deleteBook,
    deleteAllBooks,
} = require("./controller");

router
    .route("/")
    .get(getAllBooks)
    .post(createBook)
    .delete(protect, deleteAllBooks);

router.route("/by").get(protect, getByGenreOrPrice).delete(deleteBook);


router 
    .route("/:id")
    .patch(protect, updateBook)
    .delete(protect, authByRole("Super-admin", "Client"), deleteBook);

module.exports = router;