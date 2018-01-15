# Simple TODO API 

This is a simple todo API built using Node, Express and MongoDB. It is hosted on heroku at:
https://evening-shore-11452.herokuapp.com/

Users are able to create an account/login and make todos. Todos can be marked as completed and will have the time they were completed. Authentication is done using tokens with different tokens being stored in the database for different machines if required. Passwords are salted and hashed prior to storing in the database.  

MAIN REQUESTS:
POST /users creates a user
GET  /user/me gets user email
POST /user/login generates a new token for the user
DELETE /user/me/token will delete a token from the database thereby 'logging out' the user
POST /todos will post a todo for the user logged in
GET /todos will return the list of all todos for the user
GET /todos/:id will return the todo with the id provided
DELETE /todos/:id will delete the todo with the id provided
PATCH /todos/:id will edit the todo with the id provided

To use the API you must first create a user using a POST request to /users providing email and password in JSON format. If the request is successful, you will be provided with an x-auth token in the header. This token must then be included in any further requests to post, get, patch or delete todos. If the token is not provided the request will fail. If you are using another device, simply login and a new token will be created for you. You can log out by making a delete request to /users/me/token and the token will then be removed from the database. 

Todos can be created using the POST /todos request and providing the text for the todo in JSON format. You can get a list of all todos using the GET /todos request. You can use this request to get the id for a certain todo that you are interested in patching or deleting. The todo can then be patched or deleted using the appropriate request to /todos/:id where :id is replaced by the id of the todo in question.