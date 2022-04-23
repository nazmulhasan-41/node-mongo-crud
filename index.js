var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

var ObjectId = require('mongodb').ObjectId;
var dbUserName='jewel4124';
var dbPassword='j7VDSyE1oEL80vua';

const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
const uri = "mongodb+srv://jewel4124:j7VDSyE1oEL80vua@cluster0.jyuwz.mongodb.net/practicedb?retryWrites=true&w=majority";

app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  })
  
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("practicedb").collection("products");
console.log('database connected');

app.post('/addProduct', (req,res)=>{
  const product=req.body;

  collection.insertOne(product)
  .then(result=>{
    console.log(result)
  })
  res.redirect('/');
})

app.get('/products',(req,res)=>{
  console.log('in products');
  var cursor = collection.find({}) 
  .toArray((err,documents)=>{
    res.send(documents)
  })
})
app.get('/product/:id',(req,res)=>{
  
  var cursor = collection.find({_id: ObjectId(req.params.id)})
  .toArray((err,documents)=>{
    res.send(documents[0])
  })
})

app.delete('/delete/:id',(req,res)=>{
  console.log(req.params.id);
  collection.deleteOne({ 
    _id: ObjectId(req.params.id)
  })
 
  res.sendFile(__dirname + '/index.html');
});

app.patch('/update/:id',(req,res)=>{

  collection.updateOne(
    {_id:ObjectId(req.body.id)},
    { $set : { price: req.body.price, quantity: req.body.quantity }},
    )
    .then(result=>console.log('result---->',result));

    res.send('successfully updated');
});


  // client.close();
});




  app.listen(3000)

