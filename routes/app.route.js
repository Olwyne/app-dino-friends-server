const express = require('express');
const app = express();
const UserRoute = express.Router();

// User model
const User = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

UserRoute.post('/register', User.register);
UserRoute.post('/authenticate', User.authenticate);
UserRoute.put('/edit', User.edit);
UserRoute.get('/userProfile',jwtHelper.verifyJwtToken, User.userProfile);
UserRoute.delete('/delete/:id',User.delete);
UserRoute.get('/getUser/:id', User.getUser);
UserRoute.get('/getUserByMail/:email', User.getUserByMail);
UserRoute.put('/addFriend', User.addFriend);
UserRoute.put('/acceptFriend', User.acceptFriend);
UserRoute.put('/inviteFriend', User.inviteFriend);
UserRoute.put('/removeFriend', User.removeFriend);
UserRoute.put('/cancelFriend', User.cancelFriend);

module.exports = UserRoute;
