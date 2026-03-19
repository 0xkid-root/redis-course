const axios = require('axios');


const getAllPostsByID = async (req, res) => {
    try{
        const {id} = req.params;

        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        console.log(response.data);
        if(!response.data){
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).
        json(
            response.data,
            { message: 'Post retrieved successfully' }
        );

        

    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports ={
    getAllPostsByID
}