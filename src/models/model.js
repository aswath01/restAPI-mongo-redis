const dbConfig = require('./mongoModel');
const formatter = require('../helpers/formatResponse.helper');
const redis = require('redis');
const { connect } = require('mongoose');
const client = redis.createClient();
// const client = require('../db/redis');
exports.createRecord = async (data)=>{
  try {      
          const saveData = new dbConfig(data);
          const response = await saveData.save();
          const formateData = new formatter();
          const senData = await formateData.formatOutputData(response);
        //we have to create data in db and retrun the status.
        return senData;
  } catch (error) {
    return `Records cannot be created ${error}`;
  }
}
exports.updateRecord = (req,res) =>{
    res.send('updateRecord from the model');
}
exports.deleteRecord = async (UserId) =>{
  try{
    const isdeleted = await dbConfig.deleteOne({"id": UserId});
    return isdeleted;
  }
  catch(error){
    res.send(`couldn't delete the requested record as ${error}`);    
  }
}
exports.getUserByName = async (name)=>{
  try{
    const user = await dbConfig.findOne({"name":name});
    return user;
  }
  catch(error){
      return null;
    }
}
exports.getRecordsById = async (userId) =>{
  try{
    await client.connect().catch(error => {});
    // const user = await dbConfig.findById(userId);
    
    const redisKey = await client.get(userId)
    if(redisKey){
      console.log("Record is present at cache")
      return await client.get(userId);
    }
    else{
      // client.set(userId,user);
      const user = await dbConfig.findById(userId);
      console.log("record is not present at cache");
      client.set(userId,JSON.stringify(user));
      return user;
    }
  }
  catch(error){
    return `user not found ${error}`;
  }
}

exports.listrecords = async () =>{
  try{
    const records = await dbConfig.find();
    const formateData = new formatter();
    const senData = await formateData.formatlistData(records);
    return senData;
  }
  catch(error){
    return `Records cannot be listed ${error}`;     
  }
}