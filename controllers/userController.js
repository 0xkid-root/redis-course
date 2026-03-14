
const { User } = require("../modles/user");
const redisClient = require("../redis/redisClient");

const getAll = async (req, res) => {
    try {
        const cachedKey = "users:all";
        const cachedUsers = await redisClient.get(cachedKey);

        if (cachedUsers) {
            console.log("from redis");
            return res.status(200).json({ users: JSON.parse(cachedUsers) }); // parse here
        }

        const users = await User.find({});
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        // Store stringified in Redis
        await redisClient.set(cachedKey, JSON.stringify(users), { EX: 3600 });

        console.log("from mongodb");
        return res.status(200).json({ users: users });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createUser = async (req,res)=>{
    try{
        const {email,name} = req.body;
        const newUser = new User({email,name});
        await newUser.save();
        //cache the new user

        redisClient.set(`user:${newUser._id}`,JSON.stringify(newUser),{Ex:3600});
        redisClient.del("users:all");// yaha par humne old wale cache ko deelte kiya kyu ke getAll method me fir se fetch kare database se


        return res.status(201).json({message:"User created successfully"})

    }catch(error){
       return res.status(500).json({error:error.message})
    }
}

const getAUser = async (req,res)=>{
    try{
        const userId = req.params.id;
        const cachedUser = await redisClient.get(`user:${userId}`);

        if (cachedUser){
            console.log("from redis");
            return res.status(200).json({ user: JSON.parse(cachedUser) }); // parse here
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        redisClient.set(`user:${userId}`, JSON.stringify(user), { Ex: 3600 });

        return res.status(200).json({user:user});

    }catch(error){
       return  res.status(500).json({error:error.message})
    }

}

const updateAUser = async(req,res)=>{
    try{

        const {email,name} = req.body;
        const userId= req.params.id;
        const updateUser = await User.findByIdAndUpdate(userId,
            {email,name},
            {new:true}
        );

        if(!updateUser){
            return res.status(404).json({message:"User not found"});
        }

        redisClient.del("users:all"); // yaha par humne old wale cache ko deelte kiya kyu ke getAll method me fir se fetch kare database se

        redisClient.set(`user:${updateUser._id}`, JSON.stringify(updateUser), { Ex: 3600 });
        console.log("from mongodb");
        return res.status(200).json({user:updateUser});

        
        
    }catch(error){
        return res.status(500).json({error:error.message})
    }

}

const deleteAUser = async(req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        redisClient.del("users:all");
        redisClient.del(`user:${req.params.id}`);

        return res.status(200).json({message:"User deleted successfully"});
    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

module.exports={

    getAll,
    createUser,
    getAUser,
    updateAUser,
    deleteAUser
}