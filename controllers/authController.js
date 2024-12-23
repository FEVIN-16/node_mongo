
const userDb={
    users:require('../model/users.json'),
    setUsers:function(data){
        this.users=data
    }
}
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const fsPromise=require('fs').promises;
const path=require('path');

const handleLogin=async (req,res)=>{
    const {user,pwd}=req.body;
    if(!user || !pwd){
        return res.status(400).json({"message":"username and password are required..!"});
        
    }
    const foundUser=userDb.users.find(person=>person.username===user);
    if(!foundUser){
        return res.sendStatus(401);
    }
    const match=await bcrypt.compare(pwd,foundUser.password);
    if(match){
        const roles=Object.values(foundUser.roles);
        const accessToken=jwt.sign(
            {"UserInfo":
                {"username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}
        );
        const refreshToken=jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        const otherUser=userDb.users.filter(person=>person.username !== foundUser.username);
        const currentUser={...foundUser,refreshToken};
        userDb.setUsers([...otherUser,currentUser]);
        await fsPromise.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDb.users)
        )
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000})
        return res.json({accessToken});
    }else{
        return res.sendStatus(401);
    }
}

module.exports={userDb,handleLogin};