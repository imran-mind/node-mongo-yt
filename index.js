const express = require('express');
const app = express();
const {dbConnection, getDBInstance} = require('./dbConnection');

initServer();
let db;
async function initServer(){
    try{
        await dbConnection();
        db = getDBInstance();
        app.listen(8080, ()=>{
            console.log('Server is running on PORT: 8080');
        })
    }catch(err){
        console.log('Error while creating server',err);
        process.exit();
    }
}

app.get('/movies',async (req,res)=>{
    const movies = await db.collection('movies').find({}).toArray();
    res.json({message: "movies data", data: movies});
})

