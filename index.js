const express = require('express');
const app = express();
const {getMongoDBConnection} = require('./db-connection');

let db;
async function init(){
    try{
        db = getMongoDBConnection();
        console.log('MongoDB connected....');
        app.listen(8080, ()=>{
            console.log('Server is running on port:8080');
        })
    }catch(err){
        console.log('Error',err);
    }
}

init();

