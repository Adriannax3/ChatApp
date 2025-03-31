const express = require('express');
const router = express.Router();
const usersActions = require("../actions/api/usersActions");

router.get('/users', usersActions.getAllUsers);
router.get('/user', usersActions.getUser);
router.post('/users', usersActions.addUser);
router.post('/userLogin', usersActions.loginUser);
router.post('/currentUser', usersActions.verifyToken, usersActions.getCurrentUser);
router.post('/logoutUser', usersActions.verifyToken, usersActions.logout);


module.exports = router;