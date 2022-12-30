const router = require('express').Router();
const controller = require('./user.controller');

router.post('/createuser', controller.createuser);
router.post('/login', controller.login);
router.get('/getUserData/:id', controller.getUserByID);
router.get('/getalluserdata', controller.getAllUserData);
router.put('/updateUserData/:id', controller.updateUserByID);
router.delete('/deleteuserbyid/:id', controller.deleteUserByID);

module.exports = router;