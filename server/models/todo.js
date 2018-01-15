/*
    Set up the TODO model. Each todo has a text property that must be provided and must be at least 1 letter long. Completed is set to false by default and 
    completedAt is set to null by default. The creator stores the objectID of the user that created the todo
*/

var mongoose = require('mongoose');


var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }, 
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = {Todo};
