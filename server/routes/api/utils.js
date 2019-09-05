const mongodb = require('mongodb');//1x9XnwfwJfDTHigL

module.exports = {

    //Connect to the database 
    connectCollection: async function(collection) {
        const db = await mongodb.MongoClient.connect
        ('mongodb+srv://sakai:u0u79xn7e6jo5nM9@investments-mveiy.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        //TODO CHANGE DB
        return db.db('teste-gorila').collection(collection);
    }

}