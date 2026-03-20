const axios = require('axios');
const redisClient = require("../redis/redisClient");


const getAllPostsByID = async (req, res) => {
    try{
        const {id} = req.params;
        const cachedKey = `post:${id}`;
        const cachedData = await redisClient.get(cachedKey);

        if(cachedData){
            return res.status(200)
            .json({ source:"redis", data:JSON.parse(cachedData), message: 'Post retrieved successfully' });
        }

        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        console.log(response.data);
        await redisClient.set(cachedKey, JSON.stringify(response.data), { EX: 600 });
        
        if(!response.data){
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).
        json({
            source:"external api",
            data: response.data,
            message: 'Post retrieved successfully' 
    });

        

    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports ={
    getAllPostsByID
}