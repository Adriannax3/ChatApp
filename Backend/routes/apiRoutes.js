const express = require('express');
const router = express.Router();
const usersActions = require("../actions/api/usersActions");
const invitationsActions = require('../actions/api/invitationsActions');


// USERS
router.get('/users',  usersActions.verifyToken, usersActions.getAllUsers);
router.get('/usersForInvite',  usersActions.verifyToken, usersActions.getUsersForInvite);
router.get('/user', usersActions.getUser);
router.get('/currentUser', usersActions.verifyToken, usersActions.getCurrentUser);
router.post('/users', usersActions.addUser);
router.post('/userLogin', usersActions.loginUser);
router.post('/logoutUser', usersActions.verifyToken, usersActions.logout);

// INVITATIONS / FRIENDS
router.get('/friends', usersActions.verifyToken, invitationsActions.getFriends);
router.get('/friends/invitations/received', usersActions.verifyToken, invitationsActions.getReceivedInvitations);
router.post('/friends/add', usersActions.verifyToken, invitationsActions.sendInvite);
router.post('/friends/invitations/:invitationId/accept', usersActions.verifyToken, invitationsActions.acceptInvite)
router.post('/friends/invitations/:invitationId/reject', usersActions.verifyToken, invitationsActions.rejectInvite)


module.exports = router;