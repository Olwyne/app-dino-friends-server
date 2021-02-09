const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports = User;

module.exports.register = (req, res, next) => {
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.age = req.body.age;
    user.race = req.body.race;
    user.food = req.body.food;
    user.friendRequestPending = [];
    user.friendRequestAccepted = [];
    user.friendRequestSend = [];
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.edit = (req, res, next) => {
    User.findOneAndUpdate({email : req.body.email}, {
			$set: req.body
		}, (error, data) => {
			if (error) {
				return next(error);
			} else {
				res.json(data)
				console.log('Data updated successfully')
			}
		})
}

module.exports.addFriend = (req, res, next) => {
	User.findOneAndUpdate({_id : req.body.user.id}, {
			$set:req.body.user
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
	})
	User.findOneAndUpdate({_id : req.body.friend._id}, {
			$set: req.body.friend
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
	})
}

module.exports.inviteFriend = (req, res, next) => {
	User.findOneAndUpdate({_id : req.body.user.id}, {
			$set:req.body.user
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
	})
	User.findOneAndUpdate({_id : req.body.friend.id}, {
			$set: req.body.friend
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
	})
}

module.exports.acceptFriend = (req, res, next) => {
	User.findOneAndUpdate({_id : req.body.user.id}, {
			$set:req.body.user
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
		})
		User.findOneAndUpdate({_id : req.body.friend._id}, {
			$set: req.body.friend
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
		})
}

module.exports.removeFriend = (req, res, next) => {
	User.findOneAndUpdate({_id : req.body.user.id}, {
			$set:req.body.user
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
		})
	User.findOneAndUpdate({_id : req.body.friend._id}, {
			$set: req.body.friend
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
	})
}

module.exports.cancelFriend = (req, res, next) => {
	User.findOneAndUpdate({_id : req.body.user.id}, {
			$set:req.body.user
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
		})
	User.findOneAndUpdate({_id : req.body.friend._id}, {
			$set: req.body.friend
		}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			console.log('Data updated successfully')
		}
	})
}

module.exports.delete = (req, res, next) => {
    User.findOneAndDelete({_id: req.params.id}, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data
          })
        }
    })
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {   
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['id','username','email','password', 'age', 'race', 'food','friendRequestPending', 'friendRequestAccepted','friendRequestSend']) });
        }
    );
}


module.exports.getUser = (req, res, next) =>{
	User.find({ _id: {$ne:req.params.id} },(error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
}

module.exports.getUserByMail = (req, res, next) =>{
	console.log(req.params.email)
    User.findOne({ email: req.params.email },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['id','username','email','password', 'age', 'race', 'food','friendRequestPending', 'friendRequestAccepted','friendRequestSend']) });
        }
    );
}
