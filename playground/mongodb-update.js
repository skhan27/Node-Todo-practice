const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    
    const db = client.db('TodoApp')
    console.log('Connected to mongoDb server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a373a84aac28004d2c5b813')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result)=> {
    //     console.log(result);
    // });

    // db.collection('Users').findOneAndUpdate({
    //     name: 'three'
    // }, {
    //     $set: {
    //         name: 'saim'
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result)=> {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        name: 'saim'
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result)=> {
        console.log(result);
    });
    //client.close();
});