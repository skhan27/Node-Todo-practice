//GENERATE SEED DATA IN TEST DB FOR TESTING PURPOSES

const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

//create new user IDs for two users
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

//create an array of 2 users using including the IDs created above. 
const users = [{
    _id: userOneId,
    email: 'example@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'example2@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];


//Create a todo for each user. since the _creator property requires an ObjectID we provide that directly
const todos = [{
    _id: new ObjectID(),
    text: 'first test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),    
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

//Reset the entire test database of users and then populate it with the above data.
const populateUsers = (done) => {
    User.remove({}).then(()=> {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

//Reset the entire test database of todos and then populate it with the above data.
const populateTodos = (done) => {
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};