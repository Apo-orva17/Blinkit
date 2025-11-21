import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

if(!process.env.MONGODB_URI){//if mongodb uri is not present in the .env file
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB(){
    try{//if mongodb is connected successfully
await mongoose.connect(process.env.MONGODB_URI)
console.log("MONGODB connected successfully");
    }
    catch(error){
        console.log("MONGODB connection error:", error);
        process.exit(1);//exit the server incase of failure
    }
}

export default connectDB