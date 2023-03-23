const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b699yx9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

async function run(){
    try{
        const toDoCollection = client.db('seoPageOne').collection('toDo');
        const filesCollection = client.db('seoPageOne').collection('files')

        app.get('/toDo', async(req, res)=>{
            const toDo = req.body;
            const query = {}
            const result = await toDoCollection.find(query).toArray();
            res.send(result)
        });

        app.get('/files/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {id:id}
            const files = await filesCollection.find(query).toArray();
            res.send(files);
        })

        app.post('/files', async(req, res)=>{
            const file = req.body;
            const result = await filesCollection.insertOne(file);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(error => console.log(error));

app.get('/', async (req, res)=>{
    res.send('SeoPageOne server running');
})

app.listen(port, () => console.log(`SeoPageOne server running on ${port}`))