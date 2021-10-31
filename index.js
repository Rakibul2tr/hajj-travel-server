const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const object= require('mongodb').ObjectId;
const env=require('dotenv').config()
const app = express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ez3jy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db("HajjRravale");
    const packeges = database.collection("Packege");
    const users = database.collection("users");
    const gleary = database.collection("gleary");
    const bookingItem = database.collection("bookingItem");
    

    //get methoud all packege
    app.get("/home",async(req,res)=>{
        const curser= packeges.find({});
        const result = await curser.toArray();
        res.send(result)
    });
    
// user booking data insert post 
    app.post('/packeg/:id',async(req,res)=>{
        const curser = req.body;
        const result = await bookingItem.insertOne(curser);
        res.send(result)
    })
// user booking data get 
    app.get('/packeg/:id',async(req,res)=>{
        const id=req.params.id;
        const curser={_id:object(id)}
        const result=await packeges.findOne(curser);
        res.send(result)
    })
    // user data get methoud
    app.get("/user",async(req,res)=>{
        const curser= users.find({});
        const result = await curser.toArray();
        res.send(result)
    });
    ///user delete methoud
    app.delete('/user/:id',async(req,res)=>{
        const id = req.params.id;
        const curser={_id:object(id)}
        const result = await users.deleteOne(curser);
        res.send(result)
    })
    // post event data added
    app.post('/adddata',async(req,res)=>{
        const curser = req.body;
        const result = await packeges.insertOne(curser);
        res.send(result)
    });
    
    // user data get methoud
    app.get("/mybooking",async(req,res)=>{
        const curser= packeges.find({});
        const result = await curser.toArray();
  
        res.send(result)
    });
    //gleary data get kora
    app.get('/gleary',async(req,res)=>{
        const curser=gleary.find({});
        const result=await curser.toArray();
        res.send(result);
    })
    // //booking item get
    app.get("/manegeall",async(req,res)=>{
        const curser= bookingItem.find({});
        const result = await curser.toArray();
        res.send(result)
    });

    ///booking packege single packege get methoud
    app.get('/manegeall/:id',async(req,res)=>{
        const id = req.params.id;
        const curser={_id:object(id)}
        const result = await bookingItem.findOne(curser);
        
        res.send(result)
    })
    ///booking packege delete methoud
    app.delete('/manegeall/:id',async(req,res)=>{
        const id = req.params.id;
        const curser={_id:object(id)}
        const result = await bookingItem.deleteOne(curser);
        // console.log('manage',result);
        res.send(result)
    })

    //booking items update
    app.put('/manegeall/:id',async(req,res)=>{
        const id=req.params.id;
        const updateuser=req.body;
        const filter={_id:object(id)}
        const options = { upsert: true };
        const updateDoc = {
            $set: {
             username:updateuser.username,
             email:updateuser.email,
             title:updateuser.tilte,
             addres:updateuser.addres,
             description:updateuser.description,
             status:updateuser.status
            },
          };
        const result=await bookingItem.updateOne(filter,updateDoc,options)
        console.log('update',result);
        res.send(result)
    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    console.log('i am form back end');
    res.send('i am from back end')
})


app.listen(port,()=>{
    console.log('server is running');
})