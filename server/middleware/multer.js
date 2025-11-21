//for handling mulitmedia
//but we will use cloudinary for storing images

import multer from 'multer'

const storage =multer.memoryStorage()

const upload = multer({storage: storage})

export default upload