const {getMongoDBConnection} = require('./db-connection');

let db;
let movies;
init();
async function init(){
    try{
        db = await getMongoDBConnection();
        movies = db.collection("movies");
        console.log('MongoDB connected...');
        insertDocs();
    }catch(err){
        console.log('Error',err);
    }
}

async function insertOneDoc(i){
    const doc = {
        "name": "Dangal-"+i,
        "genres": [
            "motivational"
        ],
        "release_date": "01-01-2022",
        "producer": "Amir khan",
        "reviews": [
            {
                "name": "imran",
                "message": "Good movie"
            }
        ],
        "rating": 8
    }
    try{
        await movies.insertOne(doc);
        console.log('Inserted: '+i);
    }catch(err){
        console.log('Error ',err);
    }
}

async function insertDocs(){
    for(let i=0; i<1000000; i++){
        await insertOneDoc(i);
    }
}

