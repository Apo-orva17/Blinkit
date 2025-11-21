//we are using cloudinary to upload images(avatar)

import { v2 as cloudinary} from 'cloudinary'


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadImageCloudinary= async (image)=>{
    const buffer= image?.buffer || Buffer.from(await image.arrayBuffer());//convert image to buffer

    const uploadImage= await new Promise((resolve, reject)=>{
          cloudinary.uploader.upload_stream({folder:"BlinkIt"}, (err, result)=>{
            return resolve(result)
          }).end(buffer)
    })

    return uploadImage 
}

export default uploadImageCloudinary