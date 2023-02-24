const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    usr: {
        type: String
    },
    pwd: {
        type: String
    }
}, {
    collection: 'todo_users'
})
module.exports = mongoose.model('Users', userSchema)