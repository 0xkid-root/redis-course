// redis.js
const { createClient } = require('redis');
const dotenv = require('dotenv');
dotenv.config();

dotenv.config(); // Load environment variables

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
    }
});

redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
});

redisClient.on("connect", () => {
    console.log("Redis Client Connected");
});

redisClient.on("ready", () => {
    console.log("Redis connected successfully");
});

// Connect to Redis
redisClient.connect();

module.exports = redisClient; // Use export default if you are using import syntax
