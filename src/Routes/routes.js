const { response } = require('express');
const express = require('express');
const app = express();
const router = express.Router();

const gs = require('../models/model');

// parse application/json
router.post('/create', async (req, res) => {
    // console.log(req.body);
    try {
        if(await gs.getUserByName(req.body.name)){
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        else{
            const data = await gs.createRecord(req.body);
            //load it in redis.
            res.status(200);
            res.send(data); 
        }
    } catch (error) {
        console.log("error creating the record",error);
    }
})
router.get('/list', async (req,res) =>{
    try{
        //try to data from redis. else get from db.
        const data = await gs.listrecords();
        res.status(200);
        res.send(data);
    }
    catch(error){
        console.log(error);
    }
})
router.get('/get/:id', async (req,res) =>{
    try{
       /* get from redis.
        if(datafromredis){
            send data as respose from redis
        }
        else{
            get data from db
            send data as respose from db
            and set it in redix.
        }
        */
        const data  = await gs.getRecordsById(req.params.id);
        res.status(200).json(data);
        return data;
    }
    catch(error){
        console.log(error);
         res.send(error);
    }
})
router.delete('/delete/:id', async(req,res)=>{
    //need to review the code.
    try{
        const data = await gs.deleteRecord(req.params.id);
        //delete it from redis also.
        res.status(200).json({
            success : true,
            message: 'the data is deleted',
        })
    }
    catch(error){
        res.send(`Couldn't delete the record ${error}`);
    }
})



module.exports = router;
