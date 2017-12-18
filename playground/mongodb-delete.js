const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    
    const db = client.db('TodoApp')
    console.log('Connected to mongoDb server');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    //challenge
    // db.collection('Users').deleteMany({name: 'one'}).then((result) => {
    //     console.log(result);
    // });
    

    db.collection('Users').findOneAndDelete({_id : new ObjectID('5a3710c2ab55b6d5f88de120')}).then((result) => {
        console.log(result);
    });
    //client.close();
});