import jwt from "jsonwebtoken";
import User from "../model/User.js";

const isAdmin = async(req ,res ,next)=>{
    try {
        const token = req.cookies.auth
        if(!token){
            return res.status(401).json({
                error:"Can't access this page"
            })
        }
        const decode =jwt.verify(token ,process.env.JWT_SECRET)
        const user= await User.findById(decode.uid);
        if(!user){
            return res.status(404).json({
                error:"no user found"
            })
        }
if(!user.isAdmin){
    return res.status(401).json({
        error:"Can't access this page"
    })
}
        
req.user = user;
next()
    } catch (error) {

        console.log(error);
        
    }
}


export  {isAdmin}