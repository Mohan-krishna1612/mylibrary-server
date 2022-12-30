let port = 4000;
let host = '0.0.0.0';


let dbUsername = 'mylibrary';
let dbPass = 'mylibrary';
let dbURL = `mongodb+srv://${dbUsername}:${dbPass}@cluster0.ezyuolu.mongodb.net/?retryWrites=true&w=majority`;

let secretKey = "my name is khan and i am not a terrorist"

module.exports = {
    PORT: port,
    HOST: host,
    DB_URL: dbURL,
    SECRETKEY: secretKey
}