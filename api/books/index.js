const router = require('express').Router();
const controller = require('./books.controller');

router.post('/createbook', controller.createBook);
router.put('/editbookbyid/:id', controller.updateBookByID);
router.get('/getallbooks', controller.getAllBooks);
router.get('/getdashboarddata', controller.getBooksCount);
router.get('/getbookbyid/:id', controller.getBookByID);
router.get('/getavailbooks', controller.getAvailBooks);
router.get('/getmybooks/:id', controller.getMyBooks);
router.post('/buybook/:id', controller.buyBook);
router.post('/returnbook/:id', controller.returnBook);
router.delete('/deletebookbyid/:id', controller.deleteBookByID);

router.post('/reportbook', controller.submitReport);
router.get('/getreports', controller.getReports);


module.exports = router;