var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://saimkhan:saimkhan@ds135757.mlab.com:35757/mongo-node-todo-api', {useMongoClient: true});

module.exports = {
    mongoose
};