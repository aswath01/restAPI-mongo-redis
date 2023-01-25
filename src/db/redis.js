// import { createClient } from "@redis/client"
const redis = require('redis');

const client = redis.createClient();
// await client.connect();
async function redisConnect(){
    try {
        // await client.connect();
        return "REDIS: is connected";
    } catch (error) {
        return "REDIS: is not connected";
    }
} 
module.exports = redisConnect, {client};
