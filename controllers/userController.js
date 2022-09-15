const { User, Application } = require('../models');

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that Id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((user) =>
    !user
        ? res.status(404).json({ message: "No user with this Id" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that Id' })
          : Application.deleteMany({ _id: { $in: user.applications } })
      )
      .then(() => res.json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //  add new friend to user list
  addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
    .then((user) => 
    !user
    ? res
        .status(404)
        .json({ message: 'Friend created, but no user with that Id' })
    : res.json('Added friend ')
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
//  remove a friend from a user list
removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
    .then((user) => 
    !user
    ? res.status(404).json({ message: "No friend found with that Id" })
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
};