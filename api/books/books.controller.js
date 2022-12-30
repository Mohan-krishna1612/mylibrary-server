const booksModel = require('./books.model');
const userModel = require('../user/user.model');
const reportModel = require('./report.model');
const config = require("../../config/config");
const jwt = require('jsonwebtoken');

const secreateKey = config.SECRETKEY;

module.exports = {
    createBook: async(req, res) => {
        try {
            const products = new booksModel(req.body);

            const booksData = await products.save();

            if (booksData) {
                res.status(200).json({ result: true, message: "Book added successfully..." });
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getAllBooks: async(req, res) => {
        try {


            const pageSize = +req.query.pageSize;
            const currentPage = +req.query.page;
            const BooksDetails = booksModel.find();

            if (pageSize && currentPage) {
                BooksDetails.skip(pageSize * (currentPage - 1))
                    .limit(pageSize)
            }

            const totalBooks = await booksModel.count();
            const books_details = await BooksDetails;

            res.status(200).send({
                result: true,
                data: books_details,
                total: totalBooks,
            })

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getBookByID: async(req, res) => {

        try {

            const BookDetails = await booksModel.findById(req.params.id);

            if (BookDetails) {
                res.status(200).json({ result: true, data: BookDetails })
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateBookByID: async(req, res) => {

        try {

            const data = req.body;

            const updatedBookData = await booksModel.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });

            if (updatedBookData) {
                res.status(200).json({ result: true, message: "Updated book date..." })
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteBookByID: async(req, res) => {

        try {

            const deletedBook = await booksModel.findByIdAndDelete(req.params.id);

            if (deletedBook) {
                res.status(200).json({ result: true, message: "Book deleted successfully..." });
            } else {
                res.status(400).json({ result: false, message: "Something went wrong..." })
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getBooksCount: async(req, res) => {
        try {
            const users_count = await userModel.count();
            const totalBooks = await booksModel.count();
            const books_data = await booksModel.aggregate([{
                    $match: {
                        status: "Available"
                    }
                },
                {
                    $count: "Available"
                },
            ])

            let data = {
                bookCount: totalBooks,
                usersCount: users_count,
                available: books_data
            }
            res.status(200).json({ result: true, data: data })

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    buyBook: async(req, res) => {
        try {
            const token = req.params.id;
            const decoded = jwt.decode(token, secreateKey);
            const _id = decoded.subject;

            const user = await userModel.findById(_id);

            const buy_book = await booksModel.findByIdAndUpdate(req.body.id, { $set: { status: "Borrowed", borrower: user.fullName, borrowDate: Date(), returnDate: null } }, { new: true });

            console.log(req.body.id);
            if (buy_book) {
                res.status(200).json({ return: true, message: "Book borrowed successfully" })
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    returnBook: async(req, res) => {
        try {
            const token = req.params.id;
            const decoded = jwt.decode(token, secreateKey);
            const _id = decoded.subject;

            const user = await userModel.findById(_id);

            const buy_book = await booksModel.findByIdAndUpdate(req.body.id, { $set: { status: "Available", borrower: "", borrowDate: "", returnDate: Date() } }, { new: true });

            if (buy_book) {
                res.status(200).json({ result: true, message: "Book returned successfully" })
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAvailBooks: async(req, res) => {
        try {
            const availableBooks = await booksModel.aggregate([{ $match: { status: "Available" } }, ])

            if (availableBooks) {
                res.status(200).json({ result: true, data: availableBooks })
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getMyBooks: async(req, res) => {
        try {
            const token = req.params.id;
            const decoded = jwt.decode(token, secreateKey);
            const _id = decoded.subject;

            const user = await userModel.findById(_id);
            const availableBooks = await booksModel.aggregate([{ $match: { borrower: user.fullName } }, ]);

            console.log(availableBooks)

            if (availableBooks) {
                res.status(200).json({ result: true, data: availableBooks })
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    submitReport: async(req, res) => {
        try {

            const report = new reportModel(req.body);
            const subReport = await report.save();

            if (subReport) {
                res.status(200).json({ result: true, message: "Report sent successfully..." });
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getReports: async(req, res) => {
        try {
            const reportData = await reportModel.find();
            if (reportData) {
                res.status(200).json({ result: true, data: reportData });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}