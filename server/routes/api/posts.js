const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get posts
router.get('/',async (req, res) => {     
    const posts =  await loadPosts(); 
    res.send(await posts.find({}).toArray()); 
});

//Create posts
router.post('/', async (req, res) => {
    const posts = await loadPosts();
    await posts.insertOne({
        title: req.body.title,
        createdAt: new Date(),
        content: req.body.content,
        author: req.body.author
    });
    res.status(201).send();
});


//Delete posts
router.delete('/:id', async (req, res) =>{
    const posts = await loadPosts();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPosts(){
    const client = await mongodb.MongoClient.connect
    ('mongodb://prato:prato12@ds119090.mlab.com:19090/practice_vue_express',{
        useNewUrlParser: true
    });

    return client.db('practice_vue_express').collection('posts');
}
module.exports = router;