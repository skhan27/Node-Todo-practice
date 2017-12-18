//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    
    const db = client.db('TodoApp')
    console.log('Connected to mongoDb server');

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos',err);
    // });

    db.collection('Users').find({name: 'one'}).toArray().then((docs) => {
        console.log(`Users`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users',err);
    });

    //client.close();
});