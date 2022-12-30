const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Borrowed'],
        default: 'Available',
        required: true
    },
    borrower: {
        type: String,
    },
    borrowDate: {
        type: Date,
    },
    returnDate: {
        type: Date
    }

});

module.exports = mongoose.model('books', bookSchema);