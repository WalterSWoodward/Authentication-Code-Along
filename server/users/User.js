const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
});

// The third parameter here is not required as 'User' will be lowercased and pluralized
// automatically as the title of the collection.  It is added here just to be more explicit.
module.exports = mongoose.model('User', userSchema, 'users')