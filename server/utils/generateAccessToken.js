import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const generateaccessToken = async  (userId)=>{
const token  = await jwt.sign({id:userId},
     process.env.SECRET_KEY_ACCESS_TOKEN,
      {expiresIn:'5h'})



      return token
}

export default generateaccessToken;
//access token valid for 5 hours