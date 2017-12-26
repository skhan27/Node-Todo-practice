const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '6a3b40382dcc352df8342f221'; //valid id:5a3b40382dcc352df8342f22

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('not found');
//     }
//     console.log('Todo by id', todo)
// }).catch((e)=> console.log(e));

var id = '5a38b5c33f6360bd248cd9c0';

User.findById(id).then((user) => {
    if (!user){
        return console.log('user not found');
    }
    console.log('User: ', user)
}).catch((e)=>console.log('invalid id'));