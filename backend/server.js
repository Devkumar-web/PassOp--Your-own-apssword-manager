const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const dotenv=require('dotenv')
dotenv.config()


// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOp';
app.use(bodyParser.json());
app.use(cors());
const port = 3000

client.connect();
console.log("Connected to the server");


app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})


//to insert a password
app.post('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.json(req.body)
})

//to delete the password
app.delete('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})