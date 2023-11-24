const {MongoClient} = require('mongodb');

const dbUrl = 'mongodb://127.0.0.1:27017/moviesdb';

let dbInstance;
const dbConnection = async ()=>{
    try{
        const client = await MongoClient.connect(dbUrl); 
        dbInstance = client.db();
        console.log('MongoDB Connected...');
    }catch(err){
        console.log('Error while making MongoDB Connection ',err);
        throw err;
    }
}

const getDBInstance = () => dbInstance;

module.exports = {
    dbConnection,
    getDBInstance
}