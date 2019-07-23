const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true
});

const User = moongoose.model('User', UserSchema);
module.exports = User;