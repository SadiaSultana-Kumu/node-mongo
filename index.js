const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());


//database connection
const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ["Asad", 'Moin', "Sabed" , "Susmita" , "Sohana", "Sabana"];


app.get('/menu',(req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("menu");
        collection.find().toArray((err, documents) => {
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id ;
    const name = users[id];
    res.send({id, name});
});

app.post('/addMenu', (req, res) => {
   
    const menu = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("menu");
        collection.insertOne(menu, (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});

const port = process.env.PORT || 4200;
app.listen(4200, () => console.log('Listening to port 4200'));