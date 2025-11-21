//middleware=> so that the logout option is only available 
//to the users are already logged in

import jwt from "jsonwebtoken"

const auth=(req, res, next)=>{
    try{
const token=req.cookies.accessToken || req?.header?.authorization?.split(" ")[1] // bearer token=>["beare", "token"]
//we have user header.authorization only when cookies are disabled 
if(!token){
    return res.status(401).json({
        message:"Provide token",
        error:true,
        success:false
    })
}
const decode =  jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
if(!decode){
    return res.status(401).json({
        message:"Unauthorized Access",
        error:true,
        success:false
    })
}

req.userId=decode.id 

next()
   
}
    
    catch(error){
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default auth