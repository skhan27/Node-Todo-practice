//set up mongoose and the MONGODB_URI 

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
module.exports = {
    mongoose
};