const { User, Application } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get single user
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
  // Delete user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that Id' })
          : Application.deleteMany({ _id: { $in: user.applications } })
      )
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //  add new friend to a user's friend list
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
        .json({ message: 'Friend created, but found no user with that Id' })
    : res.json('Added friend ')
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
//  remove a friend from a user's friend list
removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
    .then((user) => 
    !user
    ? res.status(404).json({ message: "No friend found with this Id" })
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
};