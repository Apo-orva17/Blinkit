import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const generateRefreshToken = async  (userId)=>{
const token  = await jwt.sign({id:userId},
     process.env.SECRET_KEY_REFRESH_TOKEN,
      {expiresIn:'30d'})

      //we must update the refesh token
const updateRefeshToken =await UserModel.updateOne({
    _id:userId
},
{refresh_token:token}
)

      return token
}

export default generateRefreshToken;
//refresh token valid for 30 days