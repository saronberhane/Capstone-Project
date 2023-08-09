const Book = require("./dal");
const AppError = require("../../utils/appError")


//creating a create book 

exports.createBook = async (req, res, next) => {
    try {
        const { title, author, genre, price, description, page } = req.body;

        if (!title || !author || !genre || !price || !description || !page) {
            return next(new AppError("Missing required fields", 400));
        }

        //creating a new book entry 
        const newBook = await Book.createbook({
            title, 
            author, 
            genre, 
            price, 
            description, 
            page,
        });

        //return the new book entry
        res.status(200).json({
            status: "SUCCESS",
            message: "The new book entry was added successfully",
            data: {
                newBook,
            },
        });
    } catch (error) {
        next(error);
    }
};

//get book by genre or price 
exports.getByGenreOrPrice = async (req, res, next) => {
    try {
        const book = await Book.getByGenreOrPrice({
            genre: req.query.genre,
            price: req.query.price,
        });

        if (book.length === 0) {
            return next(new AppError("Book not found.", 404));
        }

        res.status(200).json({
            status: "SUCCESS", 
            data: {
                book,
            },
        });
    } catch (error) {
        next(error); 
    }
};

//get all book entries 
exports.getAllBooks = async (req, res, next) => {
    try {
        const book = await Book.getAllBooks();

        res.status(200).json({
            status: "SUCCESS", 
            data: {
                book,
            },
        });
    } catch (error) {
        next(error);
    }
};

//update books information
exports.updateBook = async (req, res, next) => {
    try {
        const bookID = await Book.getByid(req.params.id);
        if (!bookID) {
            return next( new AppError ("There is no book with this ID", 404));
        }

        const { title, author, genre, price, description, page } = req.body;

        const book = await Book.updateBook({
            data: {
                title, 
                author, 
                genre, 
                price, 
                description, 
                page,
            },
            id: req.params.id,
        });

        res.status(200).json({
            status: "SUCCESS", 
            message: "Book information has successfully been updated",
            data: {
                book, 
            },
        });
    } catch (error) {
        next(error);
    }
};

//delete a book information 
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.getByid(req.params.id);

        if (book.postedBy !== req.user.id)
            return next(new AppError("Forbidden resource", 403));

        await book.deleteOne();

        res.status(200).json({
            status: "SUCCESS",
            message: `Book with the title ${book.title} deleted successfully`,
        });
    } catch (error) {
        next(error);
    }
};


//delete all books information 
exports.deleteAllBooks = async (req, res, next) => {
    try {
        const book = await Book.deleteAllBooks();
        res.status(200).json({
            status: "SUCCESS",
            message: "The book information were all deleted"
        });
    } catch (error) {
        next(error);
    }
};

//test