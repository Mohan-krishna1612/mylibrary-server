const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        require: true
    },
    reportedUserName: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('reports', reportSchema);