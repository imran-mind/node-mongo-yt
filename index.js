const express = require('express');
const app = express();
const {getMongoDBConnection} = require('./db-connection');
const {ObjectId} = require('mongodb');

app.use(express.json());
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

// asc-> 1
// desc-> -1
app.get('/movies', async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const skipCount = page * limit;
        const movies = await db.collection('movies').find({})
            .skip(skipCount)
            .limit(limit)
            .sort({name: -1})
            .project({name: 0, rating: 0})
            .toArray();
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

app.post('/movies', async (req,res)=>{
    try{
        const body = req.body;
        const result = await db.collection('movies').insertOne(body);
        res.status(201).json(result);
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
})
