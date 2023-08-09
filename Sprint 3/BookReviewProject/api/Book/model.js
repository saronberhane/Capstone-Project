const { Schema, model, mongoose } = require('mongoose');

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a title"],
        },
        author: {
            type: String,
            required: [true, "Please enter the author name"],
        },
        genre: {
            type: String,
            required: [true, "Please provide the genre this book is in"],
        },

        price: {
            type: Number, 
            require: [true, "Please enter the price of the book"],
        },

        description: {
            type: String, 
            require: [true, "Please provide a discription of the book"],
        },

        page: {
            type: Number,
            required: [true, "Please provide the number of pages this book has"],
        },
    }
);

const Book = model('Book', bookSchema);
module.exports = Book;