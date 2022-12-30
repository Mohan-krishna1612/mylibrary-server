module.exports = app => {
    app.use('/api/user', require('../api/user'));
    app.use('/api/book', require('../api/books'));


}