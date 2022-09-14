const { Schema, model } = require('mongoose');

// create user model

const User = model('User', userSchema);

module.exports = User;