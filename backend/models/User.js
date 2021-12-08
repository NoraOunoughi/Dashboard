let mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default:''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;