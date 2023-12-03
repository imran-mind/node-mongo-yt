const express = require('express');
const app = express();
const {getMongoDBConnection} = require('./db-connection');
const {ObjectId} = require('mongodb');

let db;
async function init(){
    try{
        db = await getMongoDBConnection();
        console.log('MongoDB connected...');
        app.listen(8080, ()=>{
            console.log('Server is running on port:8080');
        })
    }catch(err){
        console.log('Error',err);
    }
}
init();


app.get('/movies', async (req,res)=>{
    try{
        const page = parseInt(req.query.page); // '1' -> 1
        const limit = parseInt(req.query.limit);
        const skipCount = page * limit;
        const projection = { name: 1, rating:1};
        const movies = await db.collection('movies').find({})
            .skip(skipCount)
            .limit(limit)
            .sort({name: -1})
            .project(projection)
            .toArray();
        console.log('len ',movies.length);
        res.status(200).json(movies);
    }catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
})


app.get('/movies/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await db.collection('movies').findOne({_id: new ObjectId(id)});
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
})

