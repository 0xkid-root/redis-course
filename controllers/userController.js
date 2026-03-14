
const { User } = require("../modles/user");
const redisClient = require("../redis/redisClient");

const getAll =async ()=>{
    try{
        const users = await User.find({});
        if(!users){
            return res.status(404).json({message:"No users found"});
        }

        return res.status(200).json({users:users});

    }catch(error){
        return res.status(500).json({error:error.message})
    }

}

const createUser = async (req,res)=>{
    try{
        const {email,name} = req.body;
        const newUser = new User({email,name});
        await newUser.save();
        return res.status(201).json({message:"User created successfully"})

    }catch(error){
       return res.status(500).json({error:error.message})
    }
}

const getAUser = async ()=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user:user});

    }catch(error){
       return  res.status(500).json({error:error.message})
    }

}

const updateAUser = async()=>{
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
        return res.status(200).json({user:updateUser});

        
        
    }catch(error){
        return res.status(500).json({error:error.message})
    }

}

const deleteAUser = async()=>{
    try{
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
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