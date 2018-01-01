const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedpass = '$2a$10$8FHEp1dw6yFWxSJEBq.YeeuguonouAiCo6poHPq9y5vCMpC/9fOaq';

bcrypt.compare(password, hashedpass, (err, res) => {
    console.log(res);
});





// var message = 'I am user';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data, 
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5
// token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('not changed');
// } else {
//     console.log('changed. DONT TRUST');
// }

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123ac');
// console.log('decoded', decoded);


