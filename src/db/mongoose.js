
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://aswath:qwertyup@cluster0.k6p1o.mongodb.net/test';

async function dbconnect(){
        mongoose.set('strictQuery', true);
        const connection = await mongoose.connect(url);
        const res = connection ? 'Connection established' : `error connecting to Mongoose database ${Error}`;
        //have to handle the error here.
        return res; 
}
module.exports = dbconnect;