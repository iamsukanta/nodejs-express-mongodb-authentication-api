require('dotenv').config()
module.exports = {
    // url:`mongodb://localhost/${process.env.DB_NAME}`, //For local connection
    url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-fellx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority` //For mongodb cloud connection
}