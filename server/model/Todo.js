const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let todoSchema = new Schema({
    usr_id: {
        type: String
    },
    list: {
        type: String
    }
}, {
    collection: 'todo'
})
module.exports = mongoose.model('Todo', todoSchema)