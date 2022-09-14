const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // // Get a thought by its id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought by that ID' })
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new Thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((user) => 
        !user
        ? res
            .status(404)
            .json({ message: 'No user found with that ID, Thought created!' })
        : res.json('Created Thought')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //  update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: "No thought found with that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //  delete  thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought exists with that ID" })
                : res.json({ message: "Thought Deleted" })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};